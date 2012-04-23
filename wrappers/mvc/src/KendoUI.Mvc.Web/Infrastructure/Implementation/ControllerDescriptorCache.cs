// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;

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
