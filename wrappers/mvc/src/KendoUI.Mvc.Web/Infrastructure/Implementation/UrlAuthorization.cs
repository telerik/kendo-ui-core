// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Specialized;
    using System.Globalization;
    using System.Web;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Extensions;

    public class UrlAuthorization : IUrlAuthorization
    {
        private static readonly SiteMapProvider provider = CreateProvider();

        public bool IsAccessibleToUser(RequestContext requestContext, string url)
        {
            Guard.IsNotNull(requestContext, "requestContext");
            Guard.IsNotNullOrEmpty(url, "url");

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

            /// ReSharper disable UnusedParameter.Local
            [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "httpContext", Justification = "To align with the HttpContextbase design.")]
            public bool IsAccessibleToUser(HttpContextBase httpContext)
            /// ReSharper restore UnusedParameter.Local
            {
                /// The New HttpContextBase/HttpContextWrapper does not expose the inner HttpContext
                /// which is a design smell of the ASP.NET Team, so we need have to use the
                /// untestable HttpContext.Current.

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