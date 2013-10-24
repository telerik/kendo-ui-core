namespace Kendo.Mvc.Infrastructure.Implementation
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

            this.authorizeAttributeCache = authorizeAttributeCache;
            this.authorizationContextCache = authorizationContextCache;
            this.routes = routes;
        }

        public bool IsAccessibleToUser(RequestContext requestContext, string routeName)
        {

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
            bool allowed = true;
            AuthorizationContext authorizationContext = authorizationContextCache.GetAuthorizationContext(requestContext, controllerName, actionName, routeValues);

            if (authorizationContext != null)
            {
                IController controller = authorizationContext.Controller;

                if (controller != null)
                {
                    var controllerTypeName = controller.GetType().Name;

                    controllerName = controllerTypeName.Substring(0, controllerTypeName.Length - "Controller".Length);
                }

                List<AuthorizeAttribute> authorizeAttributes = authorizeAttributeCache.GetAuthorizeAttributes(requestContext, controllerName, actionName, routeValues).ToList();
                authorizeAttributes.AddRange(GlobalFilters.Filters.Select(f => f.Instance).OfType<AuthorizeAttribute>());

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