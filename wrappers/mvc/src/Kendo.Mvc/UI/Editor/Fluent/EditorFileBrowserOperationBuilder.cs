using System;
using System.Linq;
using System.Web.Routing;
using System.Web.Mvc;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public class EditorFileBrowserOperationBuilder : IHideObjectMembers
    {
        private readonly EditorFileBrowserOperation operation;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public EditorFileBrowserOperationBuilder(EditorFileBrowserOperation operation, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.operation = operation;
        }

        /// <summary>
        /// Sets the route values for the operation.
        /// </summary>
        /// <param name="routeValues">Route values</param>        
        public EditorFileBrowserOperationBuilder Route(RouteValueDictionary routeValues)
        {
            operation.Action(routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public EditorFileBrowserOperationBuilder Action(string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public EditorFileBrowserOperationBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action and contoller values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>        
        public EditorFileBrowserOperationBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route name and values for the operation.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>        
        public EditorFileBrowserOperationBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the route name and values for the operation.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>
        public EditorFileBrowserOperationBuilder Route(string routeName, object routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the route name for the operation.
        /// </summary>
        /// <param name="routeName"></param>        
        public EditorFileBrowserOperationBuilder Route(string routeName)
        {
            operation.Route(routeName, (object)null);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Specifies an absolute or relative URL for the operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>
        public EditorFileBrowserOperationBuilder Url(string url)
        {
            operation.Url = urlGenerator.Generate(viewContext.RequestContext, url);

            return this;
        }

        private void SetUrl()
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
