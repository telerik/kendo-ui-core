namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Specialized;
    using System.Globalization;
    using System.Web;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class UrlAuthorization : IUrlAuthorization
    {
        private static readonly SiteMapProvider provider = CreateProvider();

        public bool IsAccessibleToUser(RequestContext requestContext, string url)
        {

            InternalSiteMapNode node = new InternalSiteMapNode(provider, url.ToLowerInvariant(), url);
            bool allowed = node.IsAccessibleToUser(requestContext.HttpContext);

            return allowed;
        }

        private static SiteMapProvider CreateProvider()
        {
            SiteMapProvider xmlProvider = new XmlSiteMapProvider();

            xmlProvider.Initialize("internal", new NameValueCollection { { "securityTrimmingEnabled", "true" }, { "siteMapFile", "Web.sitemap" } });

            return xmlProvider;
        }

        private sealed class InternalSiteMapNode : SiteMapNode
        {
            public InternalSiteMapNode(SiteMapProvider provider, string key, string url) : base(provider, key, url)
            {
            }

            public bool IsAccessibleToUser(HttpContextBase httpContext)
            {
                string url = Url;

                if (url.StartsWith("~/", StringComparison.Ordinal) || url.StartsWith("/", StringComparison.Ordinal))
                {
                    return IsAccessibleToUser(HttpContext.Current);
                }

                if (url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                   (url.StartsWith("https://", StringComparison.OrdinalIgnoreCase)))
                {
                    return url.StartsWith(httpContext.Request.ApplicationRoot(), StringComparison.OrdinalIgnoreCase) ?
                           IsAccessibleToUser(HttpContext.Current) :
                           true;
                }

                return false;
            }
        }
    }
}