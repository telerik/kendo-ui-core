using System;
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
    }
}