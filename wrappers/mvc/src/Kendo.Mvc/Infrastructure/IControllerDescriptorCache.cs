namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Mvc;

    public interface IControllerDescriptorCache
    {
        ControllerDescriptor GetControllerDescriptor(string controllerName, string areaName);
    }
}