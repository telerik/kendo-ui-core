namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    public class ControllerDescriptorCache : IControllerDescriptorCache
    {
        private readonly IControllerTypeCache controllerTypeCache;
        private readonly ICache cache;

        public ControllerDescriptorCache(ICache cache, IControllerTypeCache controllerTypeCache)
        {
            this.cache = cache;
            this.controllerTypeCache = controllerTypeCache;
        }

        public ControllerDescriptor GetControllerDescriptor(string controllerName, string areaName)
        {
            return cache.Get(areaName + " " + controllerName, () => ControllerDescriptorFactory(controllerName, areaName));
        }

        private ControllerDescriptor ControllerDescriptorFactory(string controllerName, string areaName)
        {
            Type controllerType = GetControllerByArea(controllerTypeCache.GetControllerTypes(controllerName), areaName);

            if (controllerType == null)
            {
                return null;
            }

            return new ReflectedControllerDescriptor(controllerType);
        }

        private Type GetControllerByArea(IList<Type> controllerTypes, string areaName)
        {
            if (areaName.HasValue())
            {
                return controllerTypes.Where(t => t.FullName.Contains("." + areaName + ".")).FirstOrDefault();
            }

            return controllerTypes.FirstOrDefault();
        }
    }
}
