namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Web;
    using System.Web.Routing;

    public class RouteDataCache : IRouteDataCache
    {
        private readonly ICache cache;

        public RouteDataCache(ICache cache)
        {
            this.cache = cache;
        }

        public RouteData GetRouteData(string key, string url)
        {
            return cache.Get(key, () => RouteDataFactory(url));
        }

        private RouteData RouteDataFactory(string url)
        {
            return RouteTable.Routes.GetRouteData(new InternalHttpContextBase(url));
        }
    }

    internal class InternalHttpContextBase : HttpContextBase
    {
        private readonly HttpRequestBase mockHttpRequestBase;

        public InternalHttpContextBase(string appRelativeUrl)
        {
            this.mockHttpRequestBase = new InternalHttpRequestBase(appRelativeUrl);
        }

        public override HttpRequestBase Request
        {
            get
            {
                return mockHttpRequestBase;
            }
        }
    }

    internal class InternalHttpRequestBase : HttpRequestBase
    {
        private readonly string appCurrentUrl;

        public InternalHttpRequestBase(string appCurrentUrl)
        {
            this.appCurrentUrl = appCurrentUrl;
        }

        public override string AppRelativeCurrentExecutionFilePath
        {
            get { return MakeCurrentUrlRelative(appCurrentUrl); }
        }

        public override string PathInfo
        {
            get { return ""; }
        }

        public override string CurrentExecutionFilePath
        {
            get { return appCurrentUrl; }
        }

        private string MakeCurrentUrlRelative(string appCurrentUrl)
        {
            int appVirtualPathLength = HttpRuntime.AppDomainAppVirtualPath.Length;

            if (appVirtualPathLength == 1)
            {
                return "~" + appCurrentUrl;
            }
            else
            {
                return "~" + appCurrentUrl.Substring(appVirtualPathLength - 1);
            }
        }
    }
}
