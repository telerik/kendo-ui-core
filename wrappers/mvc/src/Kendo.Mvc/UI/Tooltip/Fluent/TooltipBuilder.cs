namespace Kendo.Mvc.UI.Fluent
{
    using System.Web;
    using System.Web.Mvc;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Tooltip"/> component.
    /// </summary>
    public class TooltipBuilder : IHtmlString, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TooltipBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TooltipBuilder(Tooltip component)            
        {
            Component = component;
        }

        protected internal Tooltip Component
        {
            get;
            set;
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
        /// The position (relative to the target) at which the Tooltip will be shown
        /// </summary>
        /// <param name="position">The position</param>
        /// <returns></returns>
        public virtual TooltipBuilder Position(TooltipPosition position)
        {
            Component.Position = position;
            return this;
        }

        /// <summary>
        /// The inverval in milliseconds, after which the Tooltip will be shown
        /// </summary>
        /// <param name="milliseconds"></param>
        /// <returns></returns>
        public virtual TooltipBuilder ShowAfter(int milliseconds)
        {                       
            Component.ShowAfter = milliseconds;
            return this;
        }

        /// <summary>
        /// Determines if callout should be visible
        /// </summary>
        /// <param name="show"></param>
        /// <returns></returns>
        public virtual TooltipBuilder Callout(bool show)
        {
            Component.Callout = show;
            return this;
        }

        public virtual TooltipBuilder ShowOn(TooltipShowOnEvent eventName)
        {
            Component.ShowOn = eventName;                
            return this;
        }

        /// <summary>
        /// Determines if tooltip should be automatically hidden, or a close button should be present
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual TooltipBuilder AutoHide(bool value)
        {
            Component.AutoHide = value;
            return this;
        }

        public TooltipBuilder Events(Action<TooltipEventBuilder> clientEventsAction)
        {
            clientEventsAction(new TooltipEventBuilder(Component.Events));

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