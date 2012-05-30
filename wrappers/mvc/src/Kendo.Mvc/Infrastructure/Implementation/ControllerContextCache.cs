namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ControllerContextCache : IControllerContextCache
    {
        private readonly ICache cache;
        private readonly IControllerTypeCache controllerTypeCache;

        public ControllerContextCache(ICache cache, IControllerTypeCache controllerTypeCache)
        {
            this.cache = cache;
            this.controllerTypeCache = controllerTypeCache;
        }

        public ControllerContext GetControllerContext(RequestContext requestContext, string controllerName, string areaName)
        {
            ControllerContext context = cache.Get(areaName + " " + controllerName, () => ControllerContextFactory(requestContext, controllerName, areaName));

            if (context != null)
            {
                context.RequestContext = requestContext;
                context.HttpContext = requestContext.HttpContext;
            }

            return context;
        }

        private ControllerContext ControllerContextFactory(RequestContext requestContext, string controllerName, string areaName)
        {
            try
            {
                IController controller = ControllerBuilder.Current.GetControllerFactory().CreateController(requestContext, controllerName);

                if (controller == null)
                {
                    return null;
                }

                if (areaName.HasValue() && !controller.GetType().FullName.Contains("Areas"))
                {
                    IList<Type> controllerTypes = controllerTypeCache.GetControllerTypes(controllerName) ?? new List<Type>();
                    Type controllerType = GetControllerByArea(controllerTypes, areaName);

                    controller = (IController)Activator.CreateInstance(controllerType);
                }
                
                return new ControllerContext(requestContext, controller as ControllerBase);
            }
            catch (Exception)
            {
                return null;
            }
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
