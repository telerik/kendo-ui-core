// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Text;
    using System.Web;
    using System.Xml;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines a class that is used to generate searach engine sitemap xml.
    /// </summary>
    public class SiteMapHandler : HttpHandlerBase
    {
        private const string SiteMapNameSpace = "http://www.sitemaps.org/schemas/sitemap/0.9";

        private readonly SiteMapDictionary siteMaps;
        private readonly IHttpResponseCompressor httpResponseCompressor;
        private readonly IHttpResponseCacher httpResponseCacher;
        private readonly IUrlGenerator urlGenerator;

        private readonly IDictionary<string, string> duplicateChecks = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        private static string defaultPath = "~/sitemap.axd";

        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapHandler"/> class.
        /// </summary>
        /// <param name="siteMaps">The site maps.</param>
        /// <param name="httpResponseCompressor">The HTTP response compressor.</param>
        /// <param name="httpResponseCacher">The HTTP response cacher.</param>
        /// <param name="urlGenerator">The URL generator.</param>
        public SiteMapHandler(SiteMapDictionary siteMaps, IHttpResponseCompressor httpResponseCompressor, IHttpResponseCacher httpResponseCacher, IUrlGenerator urlGenerator)
        {
            Guard.IsNotNull(siteMaps, "siteMaps");
            Guard.IsNotNull(httpResponseCompressor, "httpResponseCompressor");
            Guard.IsNotNull(httpResponseCacher, "httpResponseCacher");
            Guard.IsNotNull(urlGenerator, "urlGenerator");

            this.siteMaps = siteMaps;
            this.httpResponseCompressor = httpResponseCompressor;
            this.httpResponseCacher = httpResponseCacher;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapHandler"/> class.
        /// </summary>
        public SiteMapHandler() : this(SiteMapManager.SiteMaps, DI.Current.Resolve<IHttpResponseCompressor>(), DI.Current.Resolve<IHttpResponseCacher>(), DI.Current.Resolve<IUrlGenerator>())
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
        /// Processes the request.
        /// </summary>
        /// <param name="context">The context.</param>
        public override void ProcessRequest(HttpContextBase context)
        {
            string name = context.Request.QueryString["name"];
            SiteMapBase siteMap = GetSiteMap(name);

            if ((siteMap != null) && siteMap.GenerateSearchEngineMap)
            {
                HttpResponseBase response = context.Response;

                // Set the content type
                response.ContentType = "text/xml";

                // Compress
                if (siteMap.Compress)
                {
                    httpResponseCompressor.Compress(context);
                }

                // Write
                using (StreamWriter sw = new StreamWriter(response.OutputStream, Encoding.UTF8))
                {
                    using (XmlWriter xtw = XmlWriter.Create(sw, new XmlWriterSettings { Indent = false, Encoding = Encoding.UTF8 }))
                    {
                        WriteSiteMap(xtw, siteMap, context);
                    }
                }

                // Cache
                httpResponseCacher.Cache(context, TimeSpan.FromMinutes(siteMap.CacheDurationInMinutes));
            }
        }

        private static string GetPriority(SiteMapNode node)
        {
            int priority = (int) node.UpdatePriority;
            double actualPriority = priority * .01;

            return actualPriority.ToString("0.0", CultureInfo.InvariantCulture);
        }

        private void WriteSiteMap(XmlWriter writer, SiteMapBase siteMap, HttpContextBase httpContext)
        {
            string applicationRoot = httpContext.Request.ApplicationRoot();

            writer.WriteStartDocument();
            writer.WriteStartElement("urlset", SiteMapNameSpace);

            duplicateChecks.Clear();

            WriteNode(writer, siteMap.RootNode, httpContext, applicationRoot);
            siteMap.RootNode.ChildNodes.Each(node => Iterate(writer, node, httpContext, applicationRoot));

            writer.WriteEndElement();
            writer.WriteEndDocument();
        }

        private void Iterate(XmlWriter writer, SiteMapNode node, HttpContextBase httpContext, string applicationRoot)
        {
            WriteNode(writer, node, httpContext, applicationRoot);

            node.ChildNodes.Each(childNode => Iterate(writer, childNode, httpContext, applicationRoot));
        }

        private void WriteNode(XmlWriter writer, SiteMapNode node, HttpContextBase httpContext, string applicationRoot)
        {
            if (node.IncludeInSearchEngineIndex)
            {
                string url = GetUrl(node, httpContext, applicationRoot);

                if (!string.IsNullOrEmpty(url))
                {
                    if (!duplicateChecks.ContainsKey(url))
                    {
                        writer.WriteStartElement("url", SiteMapNameSpace);
                        writer.WriteElementString("loc", SiteMapNameSpace, url);

                        if (node.LastModifiedAt.HasValue)
                        {
                            writer.WriteElementString("lastmod", SiteMapNameSpace, node.LastModifiedAt.Value.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture));
                        }

                        if (node.ChangeFrequency != SiteMapChangeFrequency.Automatic)
                        {
                            writer.WriteElementString("changefreq", SiteMapNameSpace, node.ChangeFrequency.ToString().ToLowerInvariant());
                        }

                        if (node.UpdatePriority != SiteMapUpdatePriority.Automatic)
                        {
                            string priority = GetPriority(node);

                            writer.WriteElementString("priority", SiteMapNameSpace, priority);
                        }

                        writer.WriteEndElement();

                        duplicateChecks.Add(url, url);
                    }
                }
            }
        }

        private string GetUrl(INavigatable node, HttpContextBase httpContext, string applicationRoot)
        {
            string url = urlGenerator.Generate(httpContext.RequestContext(), node);

            if (!string.IsNullOrEmpty(url))
            {
                if (!url.StartsWith("/", StringComparison.Ordinal))
                {
                    url = "/" + url;
                }

                url = applicationRoot + url;
            }

            return url;
        }

        private SiteMapBase GetSiteMap(string name)
        {
            SiteMapBase siteMap;

            if (string.IsNullOrEmpty(name))
            {
                siteMap = siteMaps.DefaultSiteMap;
            }
            else
            {
                siteMaps.TryGetValue(name, out siteMap);
            }

            return siteMap;
        }
    }
}