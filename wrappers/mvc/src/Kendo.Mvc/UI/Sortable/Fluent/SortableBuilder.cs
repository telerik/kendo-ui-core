namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Sortable"/> component.
    /// </summary>
    public class SortableBuilder : IHideObjectMembers, IHtmlString
    {
        private Sortable Component { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SortableBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public SortableBuilder(Sortable component)
        {
            Component = component;
        }

        /// <summary>
        /// The selector which to match the DOM element to which the Sortable widget will be instantiated
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder For(string selector)
        {
            Component.Container = selector;

            return this;
        }

        /// <summary>
        /// The selector which to match target child elements for which the Sortable will be shown
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder Filter(string selector)
        {
            Component.Filter = selector;
            return this;
        }

        /// <summary>
        /// Suppress initialization script rendering. Note that this options should be used in conjunction with <see cref="WidgetFactory.DeferredScripts"/>
        /// </summary>        
        /// <returns></returns>
        public virtual SortableBuilder Deferred()
        {
            Component.HasDeferredInitialization = true;

            return this;
        }

        public static implicit operator Sortable(SortableBuilder builder)
        {
            return builder.ToComponent();
        }

        /// <summary>
        /// Returns the internal view component.
        /// </summary>
        /// <returns></returns>
        public Sortable ToComponent()
        {
            return Component;
        }


        /// <summary>
        /// Sets the event configuration of the Sortable.
        /// </summary>
        /// <param name="configurator">The lambda which configures the events</param>
        public SortableBuilder Events(Action<SortableEventBuilder> configurator)
        {
            configurator(new SortableEventBuilder(Component.Events));

            return this;
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