namespace KendoUI.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class ControllerAuthorization : IControllerAuthorization
    {
        private readonly IAuthorizeAttributeCache authorizeAttributeCache;
        private readonly IAuthorizationContextCache authorizationContextCache;
        private readonly RouteCollection routes;

        public ControllerAuthorization(IAuthorizeAttributeCache authorizeAttributeCache, IAuthorizationContextCache authorizationContextCache, RouteCollection routes)
        {
            Guard.IsNotNull(authorizeAttributeCache, "authorizeAttributeCache");
            Guard.IsNotNull(authorizationContextCache, "authorizationContextCache");
            Guard.IsNotNull(routes, "routes");

            this.authorizeAttributeCache = authorizeAttributeCache;
            this.authorizationContextCache = authorizationContextCache;
            this.routes = routes;
        }

        public bool IsAccessibleToUser(RequestContext requestContext, string routeName)
        {
            Guard.IsNotNull(requestContext, "requestContext");
            Guard.IsNotNullOrEmpty(routeName, "routeName");

            RouteBase route = routes[routeName];
            RouteData routeData = route.GetRouteData(requestContext.HttpContext);

            if (routeData != null)
            {
                string controllerName = routeData.GetRequiredString("controller");
                string actionName = routeData.GetRequiredString("action");

                return IsAccessibleToUser(requestContext, controllerName, actionName);
            }
            else
            {
                return true;
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Justification = "We will not allow if there is any exception.")]
        public bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName)
        {
            return IsAccessibleToUser(requestContext, controllerName, actionName, null);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Justification = "We will not allow if there is any exception.")]
        public bool IsAccessibleToUser(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues)
        {
            Guard.IsNotNull(requestContext, "requestContext");
            Guard.IsNotNullOrEmpty(controllerName, "controllerName");
            Guard.IsNotNullOrEmpty(actionName, "actionName");

            AuthorizationContext authorizationContext = authorizationContextCache.GetAuthorizationContext(requestContext, controllerName, actionName, routeValues);
            List<AuthorizeAttribute> authorizeAttributes = authorizeAttributeCache.GetAuthorizeAttributes(requestContext, controllerName, actionName, routeValues).ToList();      
#if MVC3
            authorizeAttributes.AddRange(GlobalFilters.Filters.Select(f => f.Instance).OfType<AuthorizeAttribute>());
#endif
            bool allowed = true;

            if (authorizationContext != null)
            {
                foreach (AuthorizeAttribute authorizeAttribute in authorizeAttributes)
                {
                    authorizeAttribute.OnAuthorization(authorizationContext);

                    if (authorizationContext.Result != null && authorizationContext.Result is HttpUnauthorizedResult)
                    {
                        allowed = false;
                    }
                }
            }

            return allowed;
        }
    }
}