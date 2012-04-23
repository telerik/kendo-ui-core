// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// Defines the fluent interface for building <see cref="ChartBindingSettings"/>
    /// </summary>
    public class ChartBindingSettingsBuilder : IHideObjectMembers
    {
        private ChartBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public ChartBindingSettingsBuilder(ChartBindingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Home").Enabled((bool)ViewData["bindSales"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable binding based on certain conditions.
        /// </remarks>
        public ChartBindingSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select(MVC.Home.SalesData().GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(RouteValueDictionary routeValues)
        {
            settings.Select.Action(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Home", new RouteValueDictionary{ {"month", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);
            
            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Home", new { month = 1 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string actionName, string controllerName, object routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action and controller for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string actionName, string controllerName)
        {
            return Select(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route and values for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", "Home", new RouteValueDictionary{ {"month", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string routeName, RouteValueDictionary routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route and values for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", new {month = 1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string routeName, object routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route name for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select(string routeName)
        {
            return Select(routeName, (object)null);
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select&lt;HomeController&gt;(controller => controller.SalesData()));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBindingSettingsBuilder Select<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Select.Action(controllerAction);

            return this;
        }
    }
}