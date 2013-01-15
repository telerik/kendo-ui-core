namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Extensions;

    internal  class AuthorizeAttributeCache : IAuthorizeAttributeCache
    {
        private static readonly Type authorizeAttributeType = typeof(AuthorizeAttribute);

        private readonly IControllerTypeCache controllerTypeCache;
        private readonly IActionMethodCache actionMethodCache;
        private readonly ICache cache;

        public AuthorizeAttributeCache(ICache cache, IControllerTypeCache controllerTypeCache, IActionMethodCache actionMethodCache)
        {
            this.cache = cache;
            this.controllerTypeCache = controllerTypeCache;
            this.actionMethodCache = actionMethodCache;
        }

        public IEnumerable<AuthorizeAttribute> GetAuthorizeAttributes(RequestContext requestContext, string controllerName, string actionName, RouteValueDictionary routeValues)
        {
            IEnumerable<AuthorizeAttribute> attributes = null;
            
            IList<Type> controllerTypes = controllerTypeCache.GetControllerTypes(controllerName) ?? new List<Type>();

            Type controllerType = GetControllerByArea(requestContext, controllerTypes, routeValues);
            
            if (controllerType != null)
            {
                var map = cache.Get(controllerType.AssemblyQualifiedName,() => GetInternal(controllerType, actionMethodCache.GetAllActionMethods(controllerType)));

                map.TryGetValue(actionName, out attributes);
            }
            
            return attributes ?? new List<AuthorizeAttribute>();
        }

        private Type GetControllerByArea(RequestContext requestContext, IList<Type> controllerTypes, RouteValueDictionary routeValues) 
        {
            object area;
            object namespaces;
            string[] controllerNamespaces;

            if (routeValues != null && routeValues.TryGetValue("Area", out area) && area.ToString().HasValue()) 
            {
                return controllerTypes.Where(t => t.FullName.Contains("." + area.ToString() + ".")).FirstOrDefault();
            }

            if (requestContext.RouteData.DataTokens.TryGetValue("Namespaces", out namespaces) && namespaces is string[])
            {
                controllerNamespaces = namespaces as string[];
                if (controllerNamespaces.Length > 0)
                {
                    return controllerTypes.Where(t => t.FullName.StartsWith(controllerNamespaces[0])).FirstOrDefault();
                }
            }

            return controllerTypes.FirstOrDefault();
        }

        private static IDictionary<string, IEnumerable<AuthorizeAttribute>> GetInternal(ICustomAttributeProvider controllerType, IEnumerable<KeyValuePair<string, IList<MethodInfo>>> actionMethods)
        {
            IDictionary<string, IEnumerable<AuthorizeAttribute>> attributes = new Dictionary<string, IEnumerable<AuthorizeAttribute>>(StringComparer.OrdinalIgnoreCase);

            IEnumerable<AuthorizeAttribute> controllerAuthorizeAttribute = controllerType.GetCustomAttributes(authorizeAttributeType, true)
                                                                                         .OfType<AuthorizeAttribute>();

            foreach (KeyValuePair<string, IList<MethodInfo>> pair in actionMethods)
            {
                IList<AuthorizeAttribute> actionAttributes = new List<AuthorizeAttribute>(controllerAuthorizeAttribute);

                foreach (MethodInfo method in pair.Value)
                {
                    actionAttributes.AddRange(method.GetCustomAttributes(authorizeAttributeType, true).OfType<AuthorizeAttribute>());
                }

                attributes.Add(pair.Key, actionAttributes.OrderBy(a => a.Order));
            }

            return attributes;
        }
    }
}
