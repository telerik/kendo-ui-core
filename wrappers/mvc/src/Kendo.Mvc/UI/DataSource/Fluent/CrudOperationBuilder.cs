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

        public CrudOperationBuilder Url(RouteValueDictionary routeValues)
        {
            operation.Action(routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Url(string actionName, string controllerName, object routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            SetUrl();
            return this;
        }

        public CrudOperationBuilder Url(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            operation.Action(actionName, controllerName, routeValues);
            SetUrl();
            return this;
        }

        public CrudOperationBuilder Url(string actionName, string controllerName)
        {
            return Url(actionName, controllerName, (object)null);
        }

        public CrudOperationBuilder Url(string routeName, RouteValueDictionary routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Url(string routeName, object routeValues)
        {
            operation.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        public CrudOperationBuilder Url(string routeName)
        {
            return Url(routeName, (object)null);
        }

        public CrudOperationBuilder Url<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            operation.Action(controllerAction);
            SetUrl();
            return this;
        }

        private void SetUrl()
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
