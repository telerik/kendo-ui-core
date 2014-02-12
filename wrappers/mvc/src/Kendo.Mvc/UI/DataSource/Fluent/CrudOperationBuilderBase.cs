namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="CrudOperation"/> options.
    /// </summary>
    public abstract class CrudOperationBuilderBase<TCrudOperationBuilder> : IHideObjectMembers
        where TCrudOperationBuilder : CrudOperationBuilderBase<TCrudOperationBuilder>
    {
        protected readonly CrudOperation operation;
        protected readonly ViewContext viewContext;
        protected readonly IUrlGenerator urlGenerator;

        public CrudOperationBuilderBase(CrudOperation operation, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.operation = operation;
        }

        /// <summary>
        /// Sets the route values for the operation.
        /// </summary>
        /// <param name="routeValues">Route values</param>        
        public TCrudOperationBuilder Route(RouteValueDictionary routeValues)
        {
            operation.Action(routeValues);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public TCrudOperationBuilder Action(string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public TCrudOperationBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets the action and contoller values for the operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>        
        public TCrudOperationBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route name and values for the operation.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>        
        public TCrudOperationBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets the route name and values for the operation.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>
        public TCrudOperationBuilder Route(string routeName, object routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets the route name for the operation.
        /// </summary>
        /// <param name="routeName"></param>        
        public TCrudOperationBuilder Route(string routeName)
        {
            operation.Route(routeName, (object)null);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        public TCrudOperationBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            operation.Action(controllerAction);

            SetUrl();

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>                
        public TCrudOperationBuilder Data(Func<object, object> handler)
        {
            operation.Data.TemplateDelegate = handler;

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Sets JavaScript function which to return additional parameters which to be sent the server.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public TCrudOperationBuilder Data(string handler)
        {
            operation.Data.HandlerName = handler;

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Specifies an absolute or relative URL for the operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>
        public TCrudOperationBuilder Url(string url)
        {
            operation.Url = url;

            return (TCrudOperationBuilder)this;
        }

        /// <summary>
        /// Specifies the HTTP verb of the request. 
        /// </summary>
        /// <param name="verb">The HTTP verb</param>        
        public TCrudOperationBuilder Type(HttpVerbs verb)
        {
            operation.Type = verb.ToString().ToUpperInvariant();
            return (TCrudOperationBuilder)this;
        }

        private void SetUrl()
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
