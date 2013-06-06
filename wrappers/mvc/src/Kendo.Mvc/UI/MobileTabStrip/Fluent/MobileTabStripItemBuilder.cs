namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    public class MobileTabStripItemBuilder: IHideObjectMembers
    {
        private readonly MobileTabStripItem container;
        private readonly MobileNavigatableSettings navigatableSettings;        

        public MobileTabStripItemBuilder(MobileTabStripItem settings)
        {
            container = settings;
            navigatableSettings = settings.NavigatableSettings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the url or id of the view which will be loaded
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public MobileTabStripItemBuilder Url(string value)
        {
            container.Url = value;

            return this;
        }
        
        /// <summary>
        /// The icon of the button. It can be either one of the built-in icons, or a custom one
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public MobileTabStripItemBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the item
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public MobileTabStripItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the id of target Pane or `_top` for application level Pane
        /// </summary>
        /// <param name="value">The value that configures the target.</param>
        public MobileTabStripItemBuilder Target(string value)
        {
            container.Target = value;

            return this;
        }
        
        /// <summary>
        /// This value will be available when the action callback of ActionSheet item is executed
        /// </summary>
        /// <param name="value">The value that configures the actionsheetcontext.</param>
        public MobileTabStripItemBuilder ActionsheetContext(string value)
        {
            container.ActionsheetContext = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the value shown in badge icon
        /// </summary>
        /// <param name="value">The value that configures the badge.</param>
        public MobileTabStripItemBuilder Badge(string value)
        {
            container.Badge = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Specifies the widget to be open when is tapped (the href must be set too)
        /// </summary>
        /// <param name="value">The value that configures the rel.</param>
        public MobileTabStripItemBuilder Rel(MobileButtonRel value)
        {
            container.Rel = value;

            return this;
        }
        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileTabStripItemBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileTabStripItemBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Specifies the url for remote view to be loaded
        /// </summary> 
        public MobileTabStripItemBuilder Url(Action<MobileNavigatableSettingsBuilder> configurator)
        {
            configurator(new MobileNavigatableSettingsBuilder(navigatableSettings, null, null));

            container.Url = navigatableSettings.Url;

            return this;
        }

        /// <summary>
        /// Sets controller and action from where the remove view to be loaded.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public MobileTabStripItemBuilder Url(string actionName, string controllerName, object routeValues)
        {
            SetUrl(navigatableSettings, actionName, controllerName, routeValues);

            container.Url = navigatableSettings.Url;

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues from where the remove view to be loaded.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public MobileTabStripItemBuilder Url(string actionName, string controllerName)
        {
            SetUrl(navigatableSettings, actionName, controllerName, null);

            container.Url = navigatableSettings.Url;

            return this;
        }

        protected virtual void SetUrl(MobileNavigatableSettings settings, string actionName, string controllerName, object routeValues)
        {
            settings.Action(actionName, controllerName, routeValues);            
        }
    }
}

