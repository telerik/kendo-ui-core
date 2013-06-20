namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the MobileListViewLinkItem settings.
    /// </summary>
    public class MobileListViewLinkItemBuilder : MobileListViewItemBuilderBase<MobileListViewLinkItem, MobileListViewLinkItemBuilder>, IHideObjectMembers
    {
        private readonly MobileNavigatableSettings navigatableSettings;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public MobileListViewLinkItemBuilder(MobileListViewLinkItem item, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(item)
        {
            this.navigatableSettings = new MobileNavigatableSettings();
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// Sets the HTML attributes of the link.
        /// </summary>
        /// <param name="attributes">The HTML attributes of the link.</param>
        /// <returns></returns>
        public virtual MobileListViewLinkItemBuilder LinkHtmlAttributes(IDictionary<string, object> attributes)
        {

            Item.LinkHtmlAttributes.Clear();
            Item.LinkHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the HTML attributes of the link.
        /// </summary>
        /// <param name="attributes">The HTML attributes of the link.</param>
        /// <returns></returns>
        public virtual MobileListViewLinkItemBuilder LinkHtmlAttributes(object attributes)
        {
            return LinkHtmlAttributes(attributes.ToDictionary());
        }                   
        
        /// <summary>
        /// Specifies the id of target Pane or `_top` for application level Pane
        /// </summary>
        /// <param name="value">The value that configures the target.</param>
        public MobileListViewLinkItemBuilder Target(string value)
        {
            Item.Target = value;

            return this;
        }

        /// <summary>
        /// This value will be available when the action callback of ActionSheet item is executed
        /// </summary>
        /// <param name="value">The value that configures the actionsheetcontext.</param>
        public MobileListViewLinkItemBuilder ActionsheetContext(string value)
        {
            Item.ActionsheetContext = value;

            return this;
        }

        /// <summary>
        /// Specifies the widget to be open when is tapped (the href must be set too)
        /// </summary>
        /// <param name="value">The value that configures the rel.</param>
        public MobileListViewLinkItemBuilder Rel(MobileButtonRel value)
        {
            Item.Rel = value;

            return this;
        }

        /// <summary>
        /// Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)
        /// </summary>
        /// <param name="value">The value that configures the url.</param>
        public MobileListViewLinkItemBuilder Url(string value)
        {
            Item.Url = value;

            return this;
        }

        /// <summary>
        /// Specifies the url for remote view to be loaded
        /// </summary> 
        public MobileListViewLinkItemBuilder Url(Action<MobileNavigatableSettingsBuilder> configurator)
        {
            configurator(new MobileNavigatableSettingsBuilder(navigatableSettings, viewContext, urlGenerator));

            Item.Url = navigatableSettings.Url;

            return this;
        }

        /// <summary>
        /// Sets controller and action from where the remove view to be loaded.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public MobileListViewLinkItemBuilder Url(string actionName, string controllerName, object routeValues)
        {
            SetUrl(navigatableSettings, actionName, controllerName, routeValues);

            Item.Url = navigatableSettings.Url;

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues from where the remove view to be loaded.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public MobileListViewLinkItemBuilder Url(string actionName, string controllerName)
        {
            SetUrl(navigatableSettings, actionName, controllerName, null);

            Item.Url = navigatableSettings.Url;

            return this;
        }

        protected virtual void SetUrl(MobileNavigatableSettings settings, string actionName, string controllerName, object routeValues)
        {
            settings.Action(actionName, controllerName, routeValues);
            settings.Url = settings.GenerateUrl(viewContext, urlGenerator);
        }
    }
}
