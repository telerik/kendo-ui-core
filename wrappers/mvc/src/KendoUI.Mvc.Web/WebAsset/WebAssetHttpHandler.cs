// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.IO;
    using System.Web;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Infrastructure.Implementation;

    /// <summary>
    /// The HttpHandler to compress, cache and combine web assets.
    /// </summary>
    public class WebAssetHttpHandler : HttpHandlerBase
    {
        private readonly IHttpResponseCompressor httpResponseCompressor;
        private readonly IHttpResponseCacher httpResponseCacher;
        private readonly IWebAssetGroupReader reader;

        private static string defaultPath = "~/asset.axd";
        private static string idParameterName = "id";

        /// <summary>
        /// Initializes a new instance of the <see cref="WebAssetHttpHandler"/> class.
        /// </summary>
        /// <param name="assetRegistry">The asset registry.</param>
        /// <param name="httpResponseCompressor">The HTTP response compressor.</param>
        /// <param name="httpResponseCacher">The HTTP response cacher.</param>
        public WebAssetHttpHandler(IWebAssetGroupReader reader, IHttpResponseCompressor httpResponseCompressor, IHttpResponseCacher httpResponseCacher)
        {
            this.reader = reader;
            this.httpResponseCompressor = httpResponseCompressor;
            this.httpResponseCacher = httpResponseCacher;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="WebAssetHttpHandler"/> class.
        /// </summary>
        public WebAssetHttpHandler(): this(DI.Current.Resolve<IWebAssetGroupReader>(), 
            DI.Current.Resolve<IHttpResponseCompressor>(), 
            DI.Current.Resolve<IHttpResponseCacher>())
        {
        }

        /// <summary>
        /// Gets or sets the default path of the asset.
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
        /// Gets or sets the name of the id parameter.
        /// </summary>
        /// <value>The name of the id parameter.</value>
        public static string IdParameterName
        {
            get
            {
                return idParameterName;
            }

            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                idParameterName = value;
            }
        }

        /// <summary>
        /// Enables a WebAssetHttpHandler object to process of requests.
        /// </summary>
        /// <param name="context">The context.</param>
        public override void ProcessRequest(HttpContextBase context)
        {
            string id = context.Request.QueryString[IdParameterName];

            if (!string.IsNullOrEmpty(id))
            {
                WebAssetGroup group = SharedWebAssets.FindScriptGroup(id)
                    ?? SharedWebAssets.FindStyleSheetGroup(id) ?? new WebAssetGroupSerializer().Deserialize(id);
                
                if (group != null)
                {
                    HttpResponseBase response = context.Response;

                    // Set the content type
                    response.ContentType = group.ContentType;

                    string content = reader.Read(group);

                    if (!string.IsNullOrEmpty(content))
                    {
                        // Compress
                        if (group.Compress && !context.IsMono())
                        {
                            httpResponseCompressor.Compress(context);
                        }

                        // Write
                        using (StreamWriter sw = new StreamWriter((response.OutputStream)))
                        {
                            sw.Write(content);
                        }

                        // Cache
                        if (!context.IsDebuggingEnabled)
                        {
                            httpResponseCacher.Cache(context, TimeSpan.FromDays(group.CacheDurationInDays));
                        }
                    }
                }
            }
        }
    }
}