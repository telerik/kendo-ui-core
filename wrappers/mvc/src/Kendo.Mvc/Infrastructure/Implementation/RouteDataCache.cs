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
        private readonly string appRelativeUrl;

        public InternalHttpRequestBase(string appRelativeUrl)
        {
            this.appRelativeUrl = appRelativeUrl;
        }

        public override string AppRelativeCurrentExecutionFilePath
        {
            get { return appRelativeUrl; }
        }

        public override string PathInfo
        {
            get { return ""; }
        }

        public override string CurrentExecutionFilePath
        {
            get { return ""; }
        }
    }
}
