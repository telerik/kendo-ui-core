namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Routing;

    public interface IControllerAuthorization
    {
        bool IsAccessibleToUser(RequestContext requestContext, string routeName);

        bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName);

        bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues);
    }
}