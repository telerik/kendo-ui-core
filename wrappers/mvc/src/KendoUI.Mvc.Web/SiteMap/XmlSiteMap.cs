// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Caching;
    using System.Web.Routing;
    using System.Xml;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Infrastructure.Implementation;

    /// <summary>
    /// Xml file based sitemap.
    /// </summary>
    public class XmlSiteMap : SiteMapBase
    {
        private const string SiteMapNodeName = "siteMapNode";
        private const string RouteValuesNodeName = "routeValues";
        private const string TitleAttributeName = "title";
        private const string VisibleAttributeName = "visible";
        private const string RouteAttributeName = "route";
        private const string ControllerAttributeName = "controller";
        private const string ActionAttributeName = "action";
        private const string UrlAttributeName = "url";
        private const string LastModifiedAttributeName = "lastModifiedAt";
        private const string ChangeFrequencyAttributeName = "changeFrequency";
        private const string UpdatePriorityAttributeName = "updatePriority";
        private const string IncludeInSearchEngineIndexAttributeName = "includeInSearchEngineIndex";
        private const string AreaAttributeName = "area";

        private static readonly string[] knownAttributes = CreateKnownAttributes();

        private readonly ICacheProvider cacheProvider;
        private readonly IPathResolver pathResolver;
        private readonly IVirtualPathProvider provider;

        private static string defaultPath = "~/Web.sitemap";

        public XmlSiteMap(IPathResolver pathResolver, IVirtualPathProvider provider, ICacheProvider cacheProvider)
        {
            Guard.IsNotNull(pathResolver, "pathResolver");
            Guard.IsNotNull(provider, "fileSystem");
            Guard.IsNotNull(cacheProvider, "cacheProvider");

            this.pathResolver = pathResolver;
            this.provider = provider;
            this.cacheProvider = cacheProvider;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="XmlSiteMap"/> class.
        /// </summary>
        public XmlSiteMap(): this(new PathResolver(), DI.Current.Resolve<IVirtualPathProvider>(), DI.Current.Resolve<ICacheProvider>())
        {
        }

        /// <summary>
        /// Gets or sets the default path.
        /// </summary>
        /// <value>The default path.</value>
        public static string DefaultPath
        {
            get
            {
                return defaultPath;
            }

            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                defaultPath = value;
            }
        }

        /// <summary>
        /// Loads from the default path.
        /// </summary>
        public void Load()
        {
            LoadFrom(DefaultPath);
        }

        /// <summary>
        /// Loads from the specified path.
        /// </summary>
        /// <param name="relativeVirtualPath">The relative virtual path.</param>
        public virtual void LoadFrom(string relativeVirtualPath)
        {
            Guard.IsNotNullOrEmpty(relativeVirtualPath, "relativeVirtualPath");

            if (!string.IsNullOrEmpty(relativeVirtualPath))
            {
                InternalLoad(relativeVirtualPath);
            }
        }

        // Marked as internal for unit test
        internal void InsertInCache(string filePath)
        {
            string cacheKey = GetType().AssemblyQualifiedName + ":" + filePath;

            if (cacheProvider.Get(cacheKey) == null)
            {
                cacheProvider.Insert(cacheKey, filePath, OnCacheItemRemoved, pathResolver.Resolve(filePath));
            }
        }

        // Marked as internal for unit test
        internal virtual void InternalLoad(string physicalPath)
        {
            string content = provider.ReadAllText(physicalPath);

            if (!string.IsNullOrEmpty(content))
            {
                using (StringReader sr = new StringReader(content))
                {
                    using (XmlReader xr = XmlReader.Create(sr, new XmlReaderSettings { CloseInput = true, IgnoreWhitespace = true, IgnoreComments = true, IgnoreProcessingInstructions = true }))
                    {
                        XmlDocument doc = new XmlDocument();
                        doc.Load(xr);

                        Reset();

                        if ((doc.DocumentElement != null) && doc.HasChildNodes)
                        {
                            CacheDurationInMinutes = GetFloatValueFromAttribute(doc.DocumentElement, "cacheDurationInMinutes", DefaultCacheDurationInMinutes);
                            Compress = GetBooleanValueFromAttribute(doc.DocumentElement, "compress", true);
                            GenerateSearchEngineMap = GetBooleanValueFromAttribute(doc.DocumentElement, "generateSearchEngineMap", true);

                            XmlNode xmlRootNode = doc.DocumentElement.FirstChild;
                            Iterate(RootNode, xmlRootNode);

                            // Cache it for file change notification
                            InsertInCache(physicalPath);
                        }
                    }
                }
            }
        }

        internal void OnCacheItemRemoved(string key, object value, CacheItemRemovedReason reason)
        {
            if (reason == CacheItemRemovedReason.DependencyChanged)
            {
                InternalLoad((string)value);
            }
        }

        private static void Iterate(SiteMapNode siteMapNode, XmlNode xmlNode)
        {
            PopulateNode(siteMapNode, xmlNode);

            foreach (XmlNode xmlChildNode in xmlNode.ChildNodes)
            {
                if (xmlChildNode.LocalName.IsCaseSensitiveEqual(SiteMapNodeName))
                {
                    SiteMapNode siteMapChildNode = new SiteMapNode();
                    siteMapNode.ChildNodes.Add(siteMapChildNode);

                    Iterate(siteMapChildNode, xmlChildNode);
                }
            }
        }

        private static void PopulateNode(SiteMapNode siteMapNode, XmlNode xmlNode)
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();

            XmlNode xmlRouteValuesNode = xmlNode.FirstChild;

            if ((xmlRouteValuesNode != null) && xmlRouteValuesNode.LocalName.IsCaseSensitiveEqual(RouteValuesNodeName))
            {
                foreach (XmlNode routeValue in xmlRouteValuesNode.ChildNodes)
                {
                    routeValues[routeValue.LocalName] = routeValue.InnerText;
                }
            }

            siteMapNode.Title = GetStringValueFromAttribute(xmlNode, TitleAttributeName);
            siteMapNode.Visible = GetBooleanValueFromAttribute(xmlNode, VisibleAttributeName, true);

            string routeName = GetStringValueFromAttribute(xmlNode, RouteAttributeName);
            string controllerName = GetStringValueFromAttribute(xmlNode, ControllerAttributeName);
            string actionName = GetStringValueFromAttribute(xmlNode, ActionAttributeName);
            string url = GetStringValueFromAttribute(xmlNode, UrlAttributeName);

            string areaName = GetStringValueFromAttribute(xmlNode, AreaAttributeName);

            if (areaName != null)
            {
                routeValues["area"] = areaName;
            }

            if (!string.IsNullOrEmpty(routeName))
            {
                siteMapNode.RouteName = routeName;
                siteMapNode.RouteValues.Clear();
                siteMapNode.RouteValues.Merge(routeValues);
            }
            else if (!string.IsNullOrEmpty(controllerName) && !string.IsNullOrEmpty(actionName))
            {
                siteMapNode.ControllerName = controllerName;
                siteMapNode.ActionName = actionName;
                siteMapNode.RouteValues.Clear();
                siteMapNode.RouteValues.Merge(routeValues);
            }
            else if (!string.IsNullOrEmpty(url))
            {
                siteMapNode.Url = url;
            }

            DateTime? lastModified = GetDateValueFromAttribute(xmlNode, LastModifiedAttributeName);

            if (lastModified.HasValue)
            {
                siteMapNode.LastModifiedAt = lastModified.Value;
            }

            siteMapNode.ChangeFrequency = GetChangeFrequencyFromAttribute(xmlNode);
            siteMapNode.UpdatePriority = GetUpdatePriorityFromAttribute(xmlNode);
            siteMapNode.IncludeInSearchEngineIndex = GetBooleanValueFromAttribute(xmlNode, IncludeInSearchEngineIndexAttributeName, true);

            foreach (XmlAttribute attribute in xmlNode.Attributes)
            {
                if (!string.IsNullOrEmpty(attribute.LocalName))
                {
                    // Only add unknown attibutes
                    if (Array.BinarySearch(knownAttributes, attribute.LocalName, StringComparer.OrdinalIgnoreCase) < 0)
                    {
                        siteMapNode.Attributes.Add(attribute.LocalName, attribute.Value);
                    }
                }
            }
        }

        private static string GetStringValueFromAttribute(XmlNode node, string attributeName)
        {
            string value = null;

            if (node.Attributes.Count > 0)
            {
                XmlAttribute attribute = node.Attributes[attributeName];

                if (attribute != null)
                {
                    value = attribute.Value;
                }
            }

            return value;
        }

        private static bool GetBooleanValueFromAttribute(XmlNode node, string attributeName, bool defaultValue)
        {
            bool value = defaultValue;

            string stringValue = GetStringValueFromAttribute(node, attributeName);

            if (!string.IsNullOrEmpty(stringValue))
            {
                bool tempValue;

                if (bool.TryParse(stringValue, out tempValue))
                {
                    value = tempValue;
                }
            }

            return value;
        }

        private static float GetFloatValueFromAttribute(XmlNode node, string attributeName, float defaultValue)
        {
            float value = defaultValue;

            string stringValue = GetStringValueFromAttribute(node, attributeName);

            if (!string.IsNullOrEmpty(stringValue))
            {
                float tempValue;

                if (float.TryParse(stringValue, out tempValue))
                {
                    value = tempValue;
                }
            }

            return value;
        }

        private static DateTime? GetDateValueFromAttribute(XmlNode node, string attributeName)
        {
            string stringValue = GetStringValueFromAttribute(node, attributeName);
            DateTime? value = null;

            if (!string.IsNullOrEmpty(stringValue))
            {
                DateTime tempValue;

                if (DateTime.TryParse(stringValue, out tempValue))
                {
                    value = tempValue;
                }
            }

            return value;
        }

        private static SiteMapChangeFrequency GetChangeFrequencyFromAttribute(XmlNode node)
        {
            SiteMapChangeFrequency frequency = SiteMapChangeFrequency.Automatic;

            string stringValue = GetStringValueFromAttribute(node, ChangeFrequencyAttributeName);

            if (!string.IsNullOrEmpty(stringValue))
            {
                frequency = ToEnum(stringValue, SiteMapChangeFrequency.Automatic);
            }

            return frequency;
        }

        private static SiteMapUpdatePriority GetUpdatePriorityFromAttribute(XmlNode node)
        {
            SiteMapUpdatePriority priority = SiteMapUpdatePriority.Automatic;

            string stringValue = GetStringValueFromAttribute(node, UpdatePriorityAttributeName);

            if (!string.IsNullOrEmpty(stringValue))
            {
                priority = ToEnum(stringValue, SiteMapUpdatePriority.Automatic);
            }

            return priority;
        }

        private static string[] CreateKnownAttributes()
        {
            List<string> attributes = new List<string>(new[] { TitleAttributeName, VisibleAttributeName, RouteAttributeName, ControllerAttributeName, ActionAttributeName, UrlAttributeName, LastModifiedAttributeName, ChangeFrequencyAttributeName, UpdatePriorityAttributeName, IncludeInSearchEngineIndexAttributeName });

            attributes.Sort(StringComparer.OrdinalIgnoreCase);

            return attributes.ToArray();
        }

        private static T ToEnum<T>(string value, T defaultValue) where T : IComparable, IFormattable
        {
            Type enumType = typeof(T);

            return Enum.IsDefined(enumType, value) ? (T) Enum.Parse(enumType, value, true) : defaultValue;
        }
    }
}