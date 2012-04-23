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
    /// Defines the fluent interface for building <see cref="GridBindingSettings"/>
    /// </summary>
    public class GridBindingSettingsBuilder<T> : IHideObjectMembers where T : GridBindingSettingsBuilder<T>
    {
        private GridBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridBindingSettingsBuilder(GridBindingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
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
        public T Enabled(bool value)
        {
            settings.Enabled = value;

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select(MVC.Home.Index().GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(RouteValueDictionary routeValues)
        {
            settings.Select.Action(routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);
            
            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home", new { id = 1 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string actionName, string controllerName, object routeValues)
        {
            settings.Select.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action and controller for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string actionName, string controllerName)
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
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string routeName, RouteValueDictionary routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route and values for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", new {id=1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string routeName, object routeValues)
        {
            settings.Select.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route name for the select operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select(string routeName)
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
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select&lt;HomeController&gt;(controller => controller.Index()));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Select<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Select.Action(controllerAction);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the insert operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert(MVC.Home.Index(1).GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(RouteValueDictionary routeValues)
        {
            settings.Insert.Action(routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for insert operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Index", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Insert.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for insert operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert("Index", "Home", new { id = 1 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string actionName, string controllerName, object routeValues)
        {
            settings.Insert.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action and controller for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string actionName, string controllerName)
        {
            return Insert(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route and values for insert operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string routeName, RouteValueDictionary routeValues)
        {
            settings.Insert.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route and values for insert operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert("Default", new {id=1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string routeName, object routeValues)
        {
            settings.Insert.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route name for insert operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert(string routeName)
        {
            return Insert(routeName, (object)null);
        }

        /// <summary>
        /// Sets the action, controller and route values for insert operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Insert&lt;HomeController&gt;(controller => controller.Index()));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Insert<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Insert.Action(controllerAction);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the update operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update(MVC.Home.Index(1).GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(RouteValueDictionary routeValues)
        {
            settings.Update.Action(routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for update operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update(MVC.Home.Index(1).GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Update.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for update operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update("Index", "Home", new { id = 1 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string actionName, string controllerName, object routeValues)
        {
            settings.Update.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action and controller for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string actionName, string controllerName)
        {
            return Update(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route and values for update operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string routeName, RouteValueDictionary routeValues)
        {
            settings.Update.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route and values for update operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update("Default", new {id=1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string routeName, object routeValues)
        {
            settings.Update.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route name for update operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update(string routeName)
        {
            return Update(routeName, (object)null);
        }

        /// <summary>
        /// Sets the action, controller and route values for update operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Update&lt;HomeController&gt;(controller => controller.Index()));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Update<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Update.Action(controllerAction);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the delete operation
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete(MVC.Home.Index(1).GetRouteValueDictionary());
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(RouteValueDictionary routeValues)
        {
            settings.Delete.Action(routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for delete operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Index", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Delete.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action, controller and route values for delete operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Index", "Home", new { id = 1 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string actionName, string controllerName, object routeValues)
        {
            settings.Delete.Action(actionName, controllerName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the action and controller for the select operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Index", "Home");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string actionName, string controllerName)
        {
            return Delete(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route and values for delete operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string routeName, RouteValueDictionary routeValues)
        {
            settings.Delete.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route and values for delete operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Default", new {id=1});
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string routeName, object routeValues)
        {
            settings.Delete.Route(routeName, routeValues);

            return (T) this;
        }

        /// <summary>
        /// Sets the route name for delete operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete("Default");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete(string routeName)
        {
            return Delete(routeName, (object)null);
        }

        /// <summary>
        /// Sets the action, controller and route values for delete operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Delete&lt;HomeController&gt;(controller => controller.Index()));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public T Delete<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Delete.Action(controllerAction);

            return (T) this;
        }
    }
}