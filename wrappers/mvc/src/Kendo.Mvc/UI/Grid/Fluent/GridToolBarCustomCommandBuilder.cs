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

    /// <summary>
    /// Defines the fluent interface for configuring toolbar custom command.
    /// </summary>
    /// <typeparam name="T">The type of the model</typeparam>
    public class GridToolBarCustomCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarCustomCommand<T>, GridToolBarCustomCommandBuilder<T>> where T : class
    {
        public GridToolBarCustomCommandBuilder(GridToolBarCustomCommand<T> command) : base(command)
        {
        }
        
        /// <summary>
        /// Sets command route.
        /// </summary>
        /// <param name="routeName">The route name</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Route(string routeName)
        {
            return Route(routeName, (object)null);
        }

        /// <summary>
        /// Sets command route and route values.
        /// </summary>
        /// <param name="routeName">The route name</param>
        /// <param name="routeValues">The route values</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Route(string routeName, object routeValues)
        {
            Command.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this;
        }

        /// <summary>
        /// Sets command route and route values.
        /// </summary>
        /// <param name="routeName">The route name</param>
        /// <param name="routeValues">The route values</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Route(string routeName, RouteValueDictionary routeValues)
        {
            Command.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this;
        }

        public GridToolBarCustomCommandBuilder<T> Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            MethodCallExpression call = (MethodCallExpression)controllerAction.Body;

            string controllerName = typeof(TController).Name;

            if (!controllerName.EndsWith("Controller", StringComparison.OrdinalIgnoreCase))
            {
                throw new ArgumentException(Exceptions.ControllerNameMustEndWithController, "controllerAction");
            }

            controllerName = controllerName.Substring(0, controllerName.Length - "Controller".Length);

            if (controllerName.Length == 0)
            {
                throw new ArgumentException(Exceptions.CannotRouteToClassNamedController, "controllerAction");
            }

            if (call.Method.IsDefined(typeof(NonActionAttribute), false))
            {
                throw new ArgumentException(Exceptions.TheSpecifiedMethodIsNotAnActionMethod, "controllerAction");
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

        /// <summary>
        /// Sets command action.
        /// </summary>        
        /// <param name="routeValues">The route values</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Action(RouteValueDictionary routeValues)
        {
            Command.Action(routeValues);

            if (Command.ActionName.HasValue())
            {
                SetTextIfEmpty(Command.ActionName);
            }

            return this;
        }

        /// <summary>
        /// Sets command action and controller.
        /// </summary>        
        /// <param name="actionName">The action name</param>
        /// <param name="controllerName">The controller name</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets command action and controller.
        /// </summary>        
        /// <param name="actionName">The action name</param>
        /// <param name="controllerName">The controller name</param>
        /// <param name="routeValues">The route values</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName, object routeValues)
        {
            Command.Action(actionName, controllerName, routeValues);

            SetTextIfEmpty(actionName);

            return this;
        }

        /// <summary>
        /// Sets command action and controller.
        /// </summary>        
        /// <param name="actionName">The action name</param>
        /// <param name="controllerName">The controller name</param>
        /// <param name="routeValues">The route values</param>
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            Command.Action(actionName, controllerName, routeValues);

            SetTextIfEmpty(actionName);

            return this;
        }

        /// <summary>
        /// Sets command absolute URL.
        /// </summary>        
        /// <param name="value">The URL</param>        
        /// <returns></returns>
        public GridToolBarCustomCommandBuilder<T> Url(string value)
        {
            Command.Url(value);

            return this;
        }

        //public GridToolBarCustomCommandBuilder<T> Ajax(bool enabled)
        //{
        //    Command.Ajax = enabled;

        //    return this;
        //}

        /// <summary>
        /// Sets the command name.
        /// </summary>
        /// <param name="name">The name of the command</param>
        /// <returns></returns>
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