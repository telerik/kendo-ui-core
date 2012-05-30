namespace Kendo.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;

    public interface IAuthorizeAttributeCache
    {
        IEnumerable<AuthorizeAttribute> GetAuthorizeAttributes(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues);
    }
}