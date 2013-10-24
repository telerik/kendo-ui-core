namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class AuthorizationContextCache : IAuthorizationContextCache
    {
        private UrlHelper urlHelper;
        private RequestContext requestContext;

        private readonly ICache cache;
        private readonly IRouteDataCache routeDataCache;
        private readonly IControllerContextCache controllerContextCache;
        private readonly IControllerDescriptorCache controllerDescriptorCache;

        public AuthorizationContextCache(ICache cache, IControllerContextCache controllerContextCache, IControllerDescriptorCache controllerDescriptorCache, IRouteDataCache routeDataCache)
        {
            this.cache = cache;
            this.routeDataCache = routeDataCache;
            this.controllerContextCache = controllerContextCache;
            this.controllerDescriptorCache = controllerDescriptorCache;
        }

        public AuthorizationContext GetAuthorizationContext(RequestContext request, string controllerName, string actionName, RouteValueDictionary routeValues)
        {
            object area;
            string areaName = string.Empty;
            string key = controllerName + " " + actionName;

            if (routeValues != null && routeValues.TryGetValue("Area", out area))
            {
                areaName = area.ToString();
                key = areaName + " " + key;
            }

            if (requestContext == null)
            {
                requestContext = new RequestContext(request.HttpContext, request.RouteData);
            }
            else
            {
                requestContext.HttpContext = request.HttpContext;
                request.RouteData = request.RouteData;
            }

            if (urlHelper == null)
            {
                urlHelper = new UrlHelper(requestContext);
            }

            requestContext.RouteData = routeDataCache.GetRouteData(key, GenerateURL(actionName, controllerName, routeValues)) ?? requestContext.RouteData;

            AuthorizationContext authorizationContext = cache.Get(key, () => AuthorizationContextFactory(requestContext, controllerName, actionName, areaName));

            if (authorizationContext == null)
            {
                return null;
            }

            authorizationContext.RequestContext = requestContext;
            authorizationContext.HttpContext = requestContext.HttpContext;
            authorizationContext.Result = null;

            return authorizationContext;
        }

        private AuthorizationContext AuthorizationContextFactory(RequestContext requestContext, string controllerName, string actionName, string areaName)
        {
            ControllerContext controllerContext = controllerContextCache.GetControllerContext(requestContext, controllerName, areaName);

            if (controllerContext == null)
            {
                return null;
            }

            IController controller = controllerContext.Controller;

            if (controller != null)
            {
                var controllerTypeName = controller.GetType().Name;

                controllerName = controllerTypeName.Substring(0, controllerTypeName.Length - "Controller".Length);
            }

            ControllerDescriptor controllerDescriptor = controllerDescriptorCache.GetControllerDescriptor(controllerName, areaName);

            if (controllerDescriptor == null)
            {
                return null;
            }

            ActionDescriptor actionDescriptor = controllerDescriptor.FindAction(controllerContext, actionName);
            if (actionDescriptor == null) 
            {
                return null;
            }

            return new AuthorizationContext(controllerContext, actionDescriptor);
        }

        private string GenerateURL(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            var url = urlHelper.Action(actionName, controllerName, routeValues);

            if (url == "/" && !string.IsNullOrEmpty(controllerName) && !string.IsNullOrEmpty(actionName))
            {
                url = string.Format("{0}{1}/{2}", url, controllerName, actionName);
            }

            return url;
        }
    }
}
