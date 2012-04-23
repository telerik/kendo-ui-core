// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.IO;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using System.Web.UI;

    /// <summary>
    /// Manages ASP.NET MVC views style sheet files.
    /// </summary>
    public class StyleSheetRegistrar
    {
        private readonly IWebAssetCollectionResolver resolver;
        /// <summary>
        /// Used to ensure that the same instance is used for the same HttpContext.
        /// </summary>
        public static readonly string Key = typeof(StyleSheetRegistrar).AssemblyQualifiedName;

        private string assetHandlerPath;
        private bool hasRendered;

        /// <summary>
        /// Initializes a new instance of the <see cref="StyleSheetRegistrar"/> class.
        /// </summary>
        /// <param name="styleSheets">The style sheets.</param>
        /// <param name="viewContext">The view context.</param>
        /// <param name="assetItemMerger">The asset merger.</param>
        public StyleSheetRegistrar(WebAssetCollection styleSheets, ViewContext viewContext, IWebAssetCollectionResolver resolver)
        {
            this.resolver = resolver;

            if (viewContext.HttpContext.Items[Key] != null)
            {
                throw new InvalidOperationException(Resources.TextResource.OnlyOneStyleSheetRegistrarIsAllowedInASingleRequest);
            }

            viewContext.HttpContext.Items[Key] = this;

            DefaultGroup = new WebAssetGroup("default", false) { DefaultPath = WebAssetDefaultSettings.StyleSheetFilesPath };
            StyleSheets = styleSheets;
            styleSheets.Insert(0, DefaultGroup);

            ViewContext = viewContext;

            AssetHandlerPath = WebAssetHttpHandler.DefaultPath;
        }

        /// <summary>
        /// Gets or sets the asset handler path. Path must be a virtual path. The default value is set to WebAssetHttpHandler.DefaultPath.
        /// </summary>
        /// <value>The asset handler path.</value>
        public string AssetHandlerPath
        {
            get
            {
                return assetHandlerPath;
            }
            set
            {
                Guard.IsNotVirtualPath(value, "value");

                assetHandlerPath = value;
            }
        }

        /// <summary>
        /// Gets or sets the default group.
        /// </summary>
        /// <value>The default group.</value>
        public WebAssetGroup DefaultGroup
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the stylesheets that will be rendered in the view.
        /// </summary>
        /// <value>The style sheets.</value>
        public WebAssetCollection StyleSheets
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the view context.
        /// </summary>
        /// <value>The view context.</value>
        protected ViewContext ViewContext
        {
            get;
            private set;
        }

        /// <summary>
        /// Writes the stylesheets in the response.
        /// </summary>
        public void Render()
        {
            if (hasRendered)
            {
                throw new InvalidOperationException(Resources.TextResource.YouCannotCallRenderMoreThanOnce);
            }
#if MVC1
            var baseWriter = ViewContext.HttpContext.Response.Output;
#else
            var baseWriter = ViewContext.Writer;
#endif
            using (HtmlTextWriter textWriter = new HtmlTextWriter(baseWriter))
            {
                Write(baseWriter);
            }
 
            hasRendered = true;
        }

        public string ToHtmlString()
        {
            using (var output = new StringWriter())
            {
                Write(output);
                return output.ToString();
            }
        }

        /// <summary>
        /// Writes all stylesheet source.
        /// </summary>
        /// <param name="writer">The writer.</param>
        protected virtual void Write(TextWriter writer)
        {
            bool isSecured = ViewContext.HttpContext.Request.IsSecureConnection;
            bool canCompress = ViewContext.HttpContext.Request.CanCompress();

            var urls = resolver.Resolve(new ResolverContext
            {
                ContentType = "text/css",
                HttpHandlerPath = AssetHandlerPath,
                IsSecureConnection = isSecured,
                SupportsCompression = canCompress
            }, StyleSheets);
            
            foreach (string stylesheet in urls)
            {
                writer.WriteLine("<link type=\"text/css\" href=\"{0}\" rel=\"stylesheet\"/>".FormatWith(stylesheet));
            }
        }
    }
}