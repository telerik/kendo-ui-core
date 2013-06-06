namespace Kendo.Mvc.UI.Fluent
{    
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Linq.Expressions;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="MobileNavigatableSettings"/> options.
    /// </summary>
    public class MobileNavigatableSettingsBuilder : IHideObjectMembers
    {
        private readonly MobileNavigatableSettings settings;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public MobileNavigatableSettingsBuilder(MobileNavigatableSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.settings = settings;   
        }       

        /// <summary>
        /// Sets the route values for the settings.
        /// </summary>
        /// <param name="routeValues">Route values</param>        
        public MobileNavigatableSettingsBuilder Route(RouteValueDictionary routeValues)
        {
            settings.Action(routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the settings.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public MobileNavigatableSettingsBuilder Action(string actionName, string controllerName, object routeValues)
        {
            settings.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action, contoller and route values for the settings.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>        
        public MobileNavigatableSettingsBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Action(actionName, controllerName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the action and contoller values for the settings.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>        
        public MobileNavigatableSettingsBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route name and values for the settings.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>        
        public MobileNavigatableSettingsBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            settings.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the route name and values for the settings.
        /// </summary>
        /// <param name="routeName">Route name</param>
        /// <param name="routeValues">Route values</param>
        public MobileNavigatableSettingsBuilder Route(string routeName, object routeValues)
        {
            settings.Route(routeName, routeValues);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Sets the route name for the settings.
        /// </summary>
        /// <param name="routeName"></param>        
        public MobileNavigatableSettingsBuilder Route(string routeName)
        {
            settings.Route(routeName, (object)null);

            SetUrl();

            return this;
        }

        public MobileNavigatableSettingsBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            settings.Action(controllerAction);

            SetUrl();

            return this;
        }

        /// <summary>
        /// Specifies an absolute or relative URL for the settings.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the settings</param>
        public MobileNavigatableSettingsBuilder Url(string url)
        {
            settings.Url = url;

            return this;
        }

        private void SetUrl()
        {
            if (viewContext != null && urlGenerator != null)
            {
                settings.Url = settings.GenerateUrl(viewContext, urlGenerator);
            }
        }
    }
}
