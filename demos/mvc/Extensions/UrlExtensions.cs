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

        public static string Suite(this UrlHelper url, string suite)
        {
            suite = suite.ToLowerInvariant();

            var href = "~/" + suite;

            if (suite != "mobile")
            {
                href = "~/" + suite + "/overview/index.html";
            }

            return url.Content(url.ApplyProduct(href));
        }

        public static string ApplyProduct(this UrlHelper url, string href)
        {
            var product = url.RequestContext.HttpContext.Request.QueryString.ToString().Replace("&nav=true", "");

            if (!string.IsNullOrEmpty(product))
            {
                return href + "?" + product;
            }

            return href;
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
            if (IsAbsoluteUrl(file)) {
                return file;
            }

            return url.Content(string.Format("{0}/{1}/{2}",
                ConfigurationManager.AppSettings["CDN_ROOT"],
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
