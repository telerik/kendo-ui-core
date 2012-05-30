namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;

    internal class ActionMethodCache : IActionMethodCache
    {
        private static readonly Type actionResultType = typeof(ActionResult);
        private static readonly Type nonActionAttributeType = typeof(NonActionAttribute);
        private static readonly Type actionNaneAttributeType = typeof(ActionNameAttribute);

        private readonly IControllerTypeCache controllerTypeCache;
        private readonly ICache cache;
        
        public ActionMethodCache(ICache cache, IControllerTypeCache controllerTypeCache)
        {
            this.cache = cache;
            this.controllerTypeCache = controllerTypeCache;
        }

        public IList<MethodInfo> GetActionMethods(RequestContext requestContext, string controllerName, string actionName)
        {

            IDictionary<string, IList<MethodInfo>> allActionMethods = GetAllActionMethods(requestContext, controllerName);
            IList<MethodInfo> actionMethods;

            return allActionMethods.TryGetValue(actionName, out actionMethods) ? actionMethods : null;
        }

        public IDictionary<string, IList<MethodInfo>> GetAllActionMethods(RequestContext requestContext, string controllerName)
        {

            Type controllerType = controllerTypeCache.GetControllerTypes(requestContext, controllerName).FirstOrDefault();

            return cache.Get(controllerType.AssemblyQualifiedName, () => GetInternal(controllerType));
        }

        public IDictionary<string, IList<MethodInfo>> GetAllActionMethods(Type controllerType)
        {

            return cache.Get(controllerType.AssemblyQualifiedName, () => GetInternal(controllerType));
        }

        private static IDictionary<string, IList<MethodInfo>> GetInternal(Type controllerType)
        {
            Func<MethodInfo, bool> isActionMethod = method => actionResultType.IsAssignableFrom(method.ReturnType) && !method.IsDefined(nonActionAttributeType, false);

            IDictionary<string, IList<MethodInfo>> actionMethods = new Dictionary<string, IList<MethodInfo>>(StringComparer.OrdinalIgnoreCase);

            foreach (MethodInfo method in controllerType.GetMethods(BindingFlags.Public | BindingFlags.Instance).Where(isActionMethod))
            {
                string actionName = method.GetCustomAttributes(actionNaneAttributeType, false)
                                          .OfType<ActionNameAttribute>()
                                          .Select(attribute => attribute.Name)
                                          .SingleOrDefault() ?? method.Name;

                IList<MethodInfo> methods;

                if (!actionMethods.TryGetValue(actionName, out methods))
                {
                    methods = new List<MethodInfo>();
                    actionMethods.Add(actionName, methods);
                }

                methods.Add(method);
            }

            return actionMethods;
        }
    }
}
