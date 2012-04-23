// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Extensions;
    using Infrastructure;
    using Telerik.Web.Mvc.Resources;

    /// <summary>
    /// INavigatable extension for providing access to <see cref="INavigatable"/>.
    /// </summary>
    public static class NavigatableExtensions
    {
        /// <summary>
        /// Sets the action, controller name and route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="routeValues">The route values of the Action method.</param>
        public static void Action(this INavigatable navigatable, RouteValueDictionary routeValues)
        {
            routeValues.ApplyTo(navigatable, SetAction);
        }

        /// <summary>
        /// Sets the action and controller name, along with Route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="actionName">Action name.</param>
        /// <param name="controllerName">Controller name.</param>
        /// <param name="routeValues">Route values as an object</param>
        public static void Action(this INavigatable navigatable, string actionName, string controllerName, object routeValues)
        {
            navigatable.ControllerName = controllerName;
            navigatable.ActionName = actionName;
            navigatable.SetRouteValues(routeValues);
        }

        /// <summary>
        /// Sets the action, controller name and route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="actionName">Action name.</param>
        /// <param name="controllerName">Controller name.</param>
        /// <param name="routeValues">Route values as <see cref="RouteValueDictionary"/></param>
        public static void Action(this INavigatable navigatable, string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            SetAction(navigatable, actionName, controllerName, routeValues);
        }

        /// <summary>
        /// Sets the action and route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="item">The <see cref="INavigatable"/> object.</param>
        /// <param name="controllerAction">The controller action.</param>
        public static void Action<TController>(this INavigatable item, Expression<Action<TController>> controllerAction) where TController : Controller
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

            item.ControllerName = controllerName;
            item.ActionName = actionName;

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

                item.RouteValues.Add(parameters[i].Name, value);
            }
        }

        /// <summary>
        /// Sets the url property of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="actionName">The Url.</param>
        public static void Url(this INavigatable navigatable, string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            navigatable.Url = value;
        }

        /// <summary>
        /// Sets the route name and route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="routeName">Route name.</param>
        /// <param name="routeValues">Route values as an object.</param>
        public static void Route(this INavigatable navigatable, string routeName, object routeValues)
        {
            Guard.IsNotNullOrEmpty(routeName, "routeName");

            navigatable.RouteName = routeName;
            navigatable.SetRouteValues(routeValues);
        }

        /// <summary>
        /// Sets the route name and route values of <see cref="INavigatable"/> object.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="routeName">Route name.</param>
        /// <param name="routeValues">Route values as <see cref="RouteValueDictionary"/>.</param>
        public static void Route(this INavigatable navigatable, string routeName, RouteValueDictionary routeValues)
        {
            Guard.IsNotNullOrEmpty(routeName, "routeName");

            navigatable.RouteName = routeName;
            navigatable.SetRouteValues(routeValues);
        }

        /// <summary>
        /// Generating url depending on the ViewContext and the <see cref="IUrlGenerator"/> generator.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="viewContext">The <see cref="ViewContext"/> object</param>
        /// <param name="urlGenerator">The <see cref="IUrlGenerator"/> generator.</param>
        public static string GenerateUrl(this INavigatable navigatable, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            return urlGenerator.Generate(viewContext.RequestContext, navigatable);
        }

        /// <summary>
        /// Determines whether the specified navigatable matches the current request URL.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="viewContext">The <see cref="ViewContext"/> object.</param>
        /// <param name="urlGenerator">The <see cref="IUrlGenerator"/> generator.</param>
        /// <returns></returns>
        public static bool IsCurrent(this INavigatable navigatable, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            var currentUrl = viewContext.HttpContext.Request.Url.PathAndQuery;
            var url = urlGenerator.Generate(viewContext.RequestContext, navigatable);
            var currentRoute = new UrlHelper(viewContext.RequestContext).RouteUrl(viewContext.RequestContext.RouteData.Values);
            
            return url.IsCaseInsensitiveEqual(currentUrl) || url.IsCaseInsensitiveEqual(currentRoute);
        }

        /// <summary>
        /// Generating url depending on the ViewContext and the <see cref="IUrlGenerator"/> generator.
        /// </summary>
        /// <param name="navigatable">The <see cref="INavigatable"/> object.</param>
        /// <param name="viewContext">The <see cref="ViewContext"/> object</param>
        /// <param name="urlGenerator">The <see cref="IUrlGenerator"/> generator.</param>
        public static string GenerateUrl(this INavigatable navigatable, ViewContext viewContext, IUrlGenerator urlGenerator, RouteValueDictionary routeValues)
        {
            return urlGenerator.Generate(viewContext.RequestContext, navigatable, routeValues);
        }
        /// <summary>
        /// Verify whether the <see cref="INavigatable"/> object is accessible.
        /// </summary>
        /// <param name="item">The <see cref="INavigatable"/> object.</param>
        /// <param name="authorization">The <see cref="INavigationItemAuthorization"/> object.</param>
        /// <param name="viewContext">The <see cref="ViewContext"/> object</param>
        public static bool IsAccessible(this INavigatable item, INavigationItemAuthorization authorization, ViewContext viewContext)
        {
            return authorization.IsAccessibleToUser(viewContext.RequestContext, item);
        }

        /// <summary>
        /// Verifies whether collection of <see cref="INavigatable"/> objects is accessible.
        /// </summary>
        /// <typeparam name="T">Object of <see cref="INavigatable"/> type.</typeparam>
        /// <param name="item">The <see cref="INavigatable"/> object.</param>
        /// <param name="authorization">The <see cref="INavigationItemAuthorization"/> object.</param>
        /// <param name="viewContext">The <see cref="ViewContext"/> object</param>
        public static bool IsAccessible<T>(this IEnumerable<T> items, INavigationItemAuthorization authorization, ViewContext viewContext)
        {
            return items.Any(item => authorization.IsAccessibleToUser(viewContext.RequestContext, (INavigatable)item));
        }

        /// <summary>
        /// Determines whether this instance has value.
        /// </summary>
        /// <returns>true if either ActionName and ControllerName, RouteName or Url are set; false otherwise</returns>
        public static bool HasValue(this INavigatable navigatable)
        {
            return  (navigatable.ActionName.HasValue() && navigatable.ControllerName.HasValue()) ||
                    navigatable.RouteName.HasValue() ||
                    navigatable.Url.HasValue();
        }

        private static void SetAction(INavigatable navigatable, string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            navigatable.ActionName = actionName;
            navigatable.ControllerName = controllerName;
            navigatable.SetRouteValues(routeValues);
        }

        private static void SetRouteValues(this INavigatable navigatable, object values)
        {
            if (values != null)
            {
                navigatable.RouteValues.Clear();
                navigatable.RouteValues.Merge(values);
            }
        }

        private static void SetRouteValues(this INavigatable navigatable, IDictionary<string, object> values)
        {
            if (values != null)
            {
                navigatable.RouteValues.Clear();
                navigatable.RouteValues.Merge(values);
            }
        }
    }
}