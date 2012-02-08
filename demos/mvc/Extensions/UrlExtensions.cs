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

        public static string Script(this UrlHelper url, string file, string suite)
        {
            return ResourceUrl(url, "js", file, suite);
        }

        public static string Style(this UrlHelper url, string file, string suite)
        {
            return ResourceUrl(url, "styles", file, suite);
        }

        private static string ResourceUrl(UrlHelper url, string assetType, string file, string suite)
        {
#if DEBUG
            return url.RouteUrl("Debug", new { assetType = assetType, file = file });
#else
            if (IsAbsoluteUrl(file)) {
                return file;
            }

            return url.Content(string.Format("{0}/{1}/{2}",
                ConfigurationManager.AppSettings[suite == "mobile" ? "MOBILE_CDN_ROOT" : "CDN_ROOT"],
                assetType,
                file
            ));
#endif
        }

        private static bool IsAbsoluteUrl(string url)
        {
            Uri result;
            return Uri.TryCreate(url, UriKind.Absolute, out result);
        }
    }
}
