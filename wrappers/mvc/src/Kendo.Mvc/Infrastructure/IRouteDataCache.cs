namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Routing;

    public interface IRouteDataCache
    {
        RouteData GetRouteData(string key, string url);
    }
}