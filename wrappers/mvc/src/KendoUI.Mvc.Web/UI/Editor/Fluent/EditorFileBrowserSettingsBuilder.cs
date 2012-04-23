// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Web.Routing;

    public class EditorFileBrowserSettingsBuilder : IHideObjectMembers
    {
        private readonly EditorFileBrowserSettings settings;

        public EditorFileBrowserSettingsBuilder(EditorFileBrowserSettings settings)
        {
            this.settings = settings;
        }

        public EditorFileBrowserSettingsBuilder Browse(string actionName, string controllerName)
        {
            return Browse(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Browse(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Browse(string actionName, string controllerName, object routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName)
        {
            return Thumbnail(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, object routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName)
        {
            return Image(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Image(string actionName, string controllerName, object routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName)
        {
            return Upload(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, object routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder DeleteFile(string actionName, string controllerName)
        {
            return DeleteFile(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder DeleteFile(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.DeleteFile.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder DeleteFile(string actionName, string controllerName, object routeValues)
        {
            settings.DeleteFile.Action(actionName, controllerName, routeValues);

            return this;
        }        
        
        public EditorFileBrowserSettingsBuilder DeleteDirectory(string actionName, string controllerName)
        {
            return DeleteDirectory(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder DeleteDirectory(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.DeleteDirectory.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder DeleteDirectory(string actionName, string controllerName, object routeValues)
        {
            settings.DeleteDirectory.Action(actionName, controllerName, routeValues);

            return this;
        }
        
        public EditorFileBrowserSettingsBuilder CreateDirectory(string actionName, string controllerName)
        {
            return CreateDirectory(actionName, controllerName, (object)null);
        }

        public EditorFileBrowserSettingsBuilder CreateDirectory(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.CreateDirectory.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder CreateDirectory(string actionName, string controllerName, object routeValues)
        {
            settings.CreateDirectory.Action(actionName, controllerName, routeValues);

            return this;
        }

        public EditorFileBrowserSettingsBuilder Filter(string value)
        {
            settings.Filter = value;
            
            return this;
        }
    }
}