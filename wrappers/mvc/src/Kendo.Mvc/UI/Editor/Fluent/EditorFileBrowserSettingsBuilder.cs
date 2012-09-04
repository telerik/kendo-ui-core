using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;

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

        private void SetUrl(INavigatable operation)
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName)
        {
            return Thumbnail(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Thumbnail);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, object routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Thumbnail);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName)
        {
            return Image(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Image(string url)
        {
            settings.Image.Url = urlGenerator.Generate(viewContext.RequestContext, url); ;
            return this;
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Image);
            return this;
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName, object routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Image);
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

        public EditorFileBrowserSettingsBuilder Filter(string value)
        {
            settings.Filter = value;

            return this;
        }
    }
}
