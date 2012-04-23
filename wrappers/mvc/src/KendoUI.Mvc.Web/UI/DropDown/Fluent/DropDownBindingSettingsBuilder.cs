// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Web.Routing;

    /// <summary>
    /// Defines the fluent interface for building <see cref="DropDownBindingSettingsBuilder{TSettingsBuilder}"/>
    /// </summary>
    public class DropDownBindingSettingsBuilder<TSettingsBuilder> : IHideObjectMembers
        where TSettingsBuilder : class
    {
        private IDropDownBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public DropDownBindingSettingsBuilder(IDropDownBindingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home").Enabled((bool)ViewData["ajax"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable binding based on certain conditions.
        /// </remarks>
        public TSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select(MVC.Home.Indec(1).GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(RouteValueDictionary routeValues)
        {
            settings.Select.Action(routeValues);

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home", new { {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string actionName, string controllerName, object routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string actionName, string controllerName)
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
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string routeName, RouteValueDictionary routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the route and values for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", new {id=1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string routeName, object routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return this as TSettingsBuilder;
        }

        /// <summary>
        /// Sets the route name for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TSettingsBuilder Select(string routeName)
        {
            return Select(routeName, (object)null);
        }
    }
}
