namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Tooltip"/> component.
    /// </summary>
    public class TooltipBuilder : TooltipSettingsBuilder<TooltipBuilder>, IHtmlString
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TooltipBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TooltipBuilder(Tooltip component) :
            base(component)
        {
        }

        /// <summary>
        /// The selector which to match the DOM element to which the Tooltip widget will be instantiated
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual TooltipBuilder For(string selector)
        {
            Component.Container = selector;
            return this;
        }

        /// <summary>
        /// The selector which to match target child elements for which the Tooltip will be shown
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual TooltipBuilder Filter(string selector)
        {
            Component.Filter = selector;
            return this;
        }

        /// <summary>
        /// Suppress initialization script rendering. Note that this options should be used in conjunction with <see cref="WidgetFactory.DeferredScripts"/>
        /// </summary>        
        /// <returns></returns>
        public virtual TooltipBuilder Deferred()
        {
            Component.HasDeferredInitialization = true;

            return this;
        }

        public static implicit operator Tooltip(TooltipBuilder builder)
        {
            return builder.ToComponent();
        }

        /// <summary>
        /// Returns the internal view component.
        /// </summary>
        /// <returns></returns>
        public Tooltip ToComponent()
        {
            return Component;
        }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public virtual void Render()
        {
            Component.Render();
        }

        public string ToHtmlString()
        {
            return ToComponent().ToHtmlString();
        }

        public MvcHtmlString ToClientTemplate()
        {
            return ToComponent().ToClientTemplate();
        }

        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}