namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Routing;
    using Kendo.Mvc.UI;

    public class GridCustomActionCommandBuilder<T> : GridActionCommandBuilderBase<GridCustomActionCommand<T>, GridCustomActionCommandBuilder<T>>
        where T : class
    {
        public GridCustomActionCommandBuilder(GridCustomActionCommand<T> command) : base(command)
        {

        }

        public GridCustomActionCommandBuilder<T> Click(Func<object, object> handler)
        {            
            Command.Click.InlineCodeBlock = handler;

            return this;
        }

        public GridCustomActionCommandBuilder<T> Click(string handler)
        {
            Command.Click.HandlerName = handler;

            return this;
        }

        //TODO: Implement custom command routing
        //public GridCustomActionCommandBuilder<T> Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        //{
        //    Command.Action(actionName, controllerName, routeValues);
            
        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> Action(string actionName, string controllerName, object routeValues)
        //{
        //    Command.Action(actionName, controllerName, routeValues);
            
        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> Action(string actionName, string controllerName)
        //{
        //    Command.Action(actionName, controllerName, (object)null);

        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> SendDataKeys(bool value)
        //{
        //    Command.SendDataKeys = value;

        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> SendState(bool value)
        //{
        //    Command.SendState = value;

        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> Ajax(bool enabled)
        //{
        //    Command.Ajax = enabled;

        //    return this;
        //}

        //public GridCustomActionCommandBuilder<T> DataRouteValues(Action<GridDataKeyFactory<T>> factory)
        //{
        //    factory(new GridDataKeyFactory<T>(Command.DataRouteValues, true));

        //    return this;
        //}
    }
}