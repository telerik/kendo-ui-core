namespace Kendo.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;
    using System;

    public interface IActionMethodCache
    {
        IList<MethodInfo> GetActionMethods(RequestContext requestContext, string controllerName, string actionName);
        IDictionary<string, IList<MethodInfo>> GetAllActionMethods(RequestContext requestContext, string controllerName);

        IDictionary<string, IList<MethodInfo>> GetAllActionMethods(Type controllerType);
    }
}