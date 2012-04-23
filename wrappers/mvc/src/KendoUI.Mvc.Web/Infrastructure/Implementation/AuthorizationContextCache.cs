// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class AuthorizationContextCache : IAuthorizationContextCache
    {
        private readonly ICache cache;
        private readonly IControllerContextCache controllerContextCache;
        private readonly IControllerDescriptorCache controllerDescriptorCache;

        public AuthorizationContextCache(ICache cache, IControllerContextCache controllerContextCache, IControllerDescriptorCache controllerDescriptorCache)
        {
            this.cache = cache;
            this.controllerContextCache = controllerContextCache;
            this.controllerDescriptorCache = controllerDescriptorCache;
        }

        public AuthorizationContext GetAuthorizationContext(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues)
        {
            object area;
            string areaName = string.Empty;
            string key = controllerName + " " + actionName;

            if (routeValues != null && routeValues.TryGetValue("Area", out area))
            {
                areaName = area.ToString();
                key = areaName + " " + key;
            }

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
#if MVC1
            if (controllerContext == null) 
            {
                return null;
            }

            return new AuthorizationContext(controllerContext);
#else
            ControllerDescriptor controllerDescriptor = controllerDescriptorCache.GetControllerDescriptor(controllerName, areaName);
            if (controllerContext == null || controllerDescriptor == null)
            {
                return null;
            }

            ActionDescriptor actionDescriptor = controllerDescriptor.FindAction(controllerContext, actionName);
            if (actionDescriptor == null) 
            {
                return null;
            }

            return new AuthorizationContext(controllerContext, actionDescriptor);
#endif
        }
    }
}
