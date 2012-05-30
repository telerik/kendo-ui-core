using System;
using System.Linq;
using System.Web.Routing;
using System.Web.Mvc;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    public class CrudOperationBuilder: IHideObjectMembers
    {
        private readonly CrudOperation operation;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public CrudOperationBuilder(CrudOperation operation, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.operation = operation;
        }

        public CrudOperationBuilder Route(RouteValueDictionary routeValues)
        {
            operation.Action(routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Action(string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        public CrudOperationBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Route(string routeName, object routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Route(string routeName)
        {
            operation.Route(routeName, (object)null);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            operation.Action(controllerAction);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Data(Func<object, object> handler)
        {
            operation.Data.InlineCodeBlock = handler;

            return this;
        }

        public CrudOperationBuilder Data(string handler)
        {
            operation.Data.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Specifies an absolute or relative URL for the operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>
        public CrudOperationBuilder Url(string url)
        {
            operation.Url = url;

            return this;
        }

        private void SetUrl()
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
