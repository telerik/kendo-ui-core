namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public interface IAuthorizationContextCache
    {
        AuthorizationContext GetAuthorizationContext(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues);
    }
}