using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using System;

namespace Kendo.Mvc.UI.Fluent
{
    public class EditorFileBrowserSettingsBuilder : IHideObjectMembers
    {
        private readonly EditorFileBrowserSettings settings;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public EditorFileBrowserSettingsBuilder(EditorFileBrowserSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.settings = settings;
        }

        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName)
        {            
            return Read(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Read.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Read);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName, object routeValues)
        {
            settings.Read.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Read);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Read(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Read, viewContext, urlGenerator));

            return this;
        }

        private void SetUrl(INavigatable operation)
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }

        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName)
        {
            return File(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder File(string url)
        {
            settings.File.Url = urlGenerator.Generate(viewContext.RequestContext, url);
            return this;
        }

        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.File.Action(actionName, controllerName, routeValues);
            SetUrl(settings.File);
            return this;
        }

        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName, object routeValues)
        {
            settings.File.Action(actionName, controllerName, routeValues);
            SetUrl(settings.File);
            return this;
        }

        public EditorFileBrowserSettingsBuilder File(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.File, viewContext, urlGenerator));

            return this;
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName)
        {
            return Upload(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Upload);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, object routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Upload);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Upload(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Upload, viewContext, urlGenerator));

            return this;
        }

        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName)
        {
            return Destroy(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Destroy.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Destroy);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName, object routeValues)
        {
            settings.Destroy.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Destroy);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Destroy(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Destroy, viewContext, urlGenerator));

            return this;
        }

        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName)
        {
            return Create(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Create.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Create);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName, object routeValues)
        {
            settings.Create.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Create);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Create(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Create, viewContext, urlGenerator));

            return this;
        }

        public EditorFileBrowserSettingsBuilder FileTypes(string value)
        {
            settings.FileTypes = value;

            return this;
        }
    }
}
