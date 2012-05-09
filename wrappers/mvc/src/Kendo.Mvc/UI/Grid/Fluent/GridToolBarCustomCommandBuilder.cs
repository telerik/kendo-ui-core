namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Resources;
    using Extensions;

    public class GridToolBarCustomCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarCustomCommand<T>, GridToolBarCustomCommandBuilder<T>> where T : class
    {
        public GridToolBarCustomCommandBuilder(GridToolBarCustomCommand<T> command) : base(command)
        {
        }

        public  GridToolBarCustomCommandBuilder<T> Route(string routeName)
        {
            return Route(routeName, (object) null);
        }

        public  GridToolBarCustomCommandBuilder<T> Route(string routeName, object routeValues)
        {
            Command.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Route(string routeName, RouteValueDictionary routeValues)
        {
            Command.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            MethodCallExpression call = (MethodCallExpression)controllerAction.Body;

            string controllerName = typeof(TController).Name;

            if (!controllerName.EndsWith("Controller", StringComparison.OrdinalIgnoreCase))
            {
                throw new ArgumentException(TextResource.ControllerNameMustEndWithController, "controllerAction");
            }

            controllerName = controllerName.Substring(0, controllerName.Length - "Controller".Length);

            if (controllerName.Length == 0)
            {
                throw new ArgumentException(TextResource.CannotRouteToClassNamedController, "controllerAction");
            }

            if (call.Method.IsDefined(typeof(NonActionAttribute), false))
            {
                throw new ArgumentException(TextResource.TheSpecifiedMethodIsNotAnActionMethod, "controllerAction");
            }

            string actionName = call.Method.GetCustomAttributes(typeof(ActionNameAttribute), false)
                                           .OfType<ActionNameAttribute>()
                                           .Select(attribute => attribute.Name)
                                           .FirstOrDefault() ?? call.Method.Name;

            Command.ControllerName = controllerName;
            Command.ActionName = actionName;

            ParameterInfo[] parameters = call.Method.GetParameters();

            for (int i = 0; i < parameters.Length; i++)
            {
                Expression arg = call.Arguments[i];
                object value;
                ConstantExpression ce = arg as ConstantExpression;

                if (ce != null)
                {
                    value = ce.Value;
                }
                else
                {
                    Expression<Func<object>> lambdaExpression = Expression.Lambda<Func<object>>(Expression.Convert(arg, typeof(object)));
                    Func<object> func = lambdaExpression.Compile();
                    value = func();
                }

                Command.RouteValues.Add(parameters[i].Name, value);
            }

            return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Action(RouteValueDictionary routeValues)
        {
             Command.Action(routeValues);

             if (Command.ActionName.HasValue()) 
             {
                 SetTextIfEmpty(Command.ActionName);
             }

             return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        public  GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName, object routeValues)
        {
            Command.Action(actionName, controllerName, routeValues);

            SetTextIfEmpty(actionName);

            return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            Command.Action(actionName, controllerName, routeValues);

            SetTextIfEmpty(actionName);

            return this;
        }

        public  GridToolBarCustomCommandBuilder<T> Url(string value)
        {
            Command.Url(value);

            return this;
        }

        public GridToolBarCustomCommandBuilder<T> Ajax(bool enabled)
        {
            Command.Ajax = enabled;

            return this;
        }

        public GridToolBarCustomCommandBuilder<T> Name(string name)
        {
            Command.Name = name;

            return this;
        }

        private void SetTextIfEmpty(string value)
        {
            if (string.IsNullOrEmpty(Command.Text))
            {
                Command.Text = value;
            }
        }
    }
}