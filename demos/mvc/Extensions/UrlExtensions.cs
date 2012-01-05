using System;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Extensions
{
    public static class UrlExtensions
    {
        public static string ContentOrEmpty(this UrlHelper url, string contentUrl)
        {
            if (string.IsNullOrEmpty(contentUrl))
            {
                return "";
            }

            return url.Content(contentUrl);
        }

        public static string Script(this UrlHelper url, string file)
        {
            return ResourceUrl(url, "js", file);
        }

        public static string Style(this UrlHelper url, string file)
        {
            return ResourceUrl(url, "styles", file);
        }

        private static string ResourceUrl(UrlHelper url, string assetType, string file)
        {
#if DEBUG
            return url.RouteUrl("Debug", new { assetType = assetType, file = file });
#else
            return url.Content(string.Format("{0}/{1}/{2}",
                ConfigurationManager.AppSettings["CDN_ROOT"],
                assetType,
                file
            ));
#endif
        }
    }
}
