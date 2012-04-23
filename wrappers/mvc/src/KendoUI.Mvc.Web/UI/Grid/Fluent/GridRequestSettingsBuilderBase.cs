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
    using Infrastructure;
    
    /// <summary>
    /// Defines the fluent interface for building <see cref="GridRequestSettings"/>
    /// </summary>
    public class GridRequestSettingsBuilderBase<TSettings, TBuilder> : IHideObjectMembers where TSettings : RequestSettings where TBuilder : class, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridRequestSettingsBuilderBase&lt;TSettings, TBuilder&gt;"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridRequestSettingsBuilderBase(TSettings settings)
        {
            Guard.IsNotNull(settings, "settings");
            Settings = settings;
        }

        /// <summary>
        /// Gets or sets the settings.
        /// </summary>
        /// <value>The settings.</value>
        protected TSettings Settings
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the route and values
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Route("Default", new {id=1}))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Route(string routeName, object routeValues)
        {
            Settings.Route(routeName, routeValues);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the route and values
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Route("Default", new RouteValueDictionary{{"id",1}}))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            Settings.Route(routeName, routeValues);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the route name
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Route("Default"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Route(string routeName)
        {
            return Route(routeName, (object) null);
        }

        /// <summary>
        /// Sets the action, controller and route values
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action(MVC.Home.Index(1).GetRouteValueDictionary()))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Action(RouteValueDictionary routeValues)
        {
            Settings.Action(routeValues);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("Index", "Home", new {id = 1}))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Action(string actionName, string controllerName, object routeValues)
        {
            Settings.Action(actionName, controllerName, routeValues);

            return this as TBuilder;
        }
        
        /// <summary>
        /// Sets the action, controller and route values
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("Index", "Home", new RouteValueDictionary{ {"id", 1} }))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            Settings.Action(actionName, controllerName, routeValues);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("Index", "Home"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        public virtual TBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            Settings.Action(controllerAction);
            return this as TBuilder;
        }
    }
}