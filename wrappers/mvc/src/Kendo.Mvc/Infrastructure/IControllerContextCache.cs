namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public interface IControllerContextCache
    {
        ControllerContext GetControllerContext(RequestContext requestContext, string controllerName, string areaName);
    }
}