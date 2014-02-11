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
        /// The selector to match the DOM element to which the Sortable widget will be instantiated
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder For(string selector)
        {
            Component.Container = selector;

            return this;
        }

        /// <summary>
        /// The selector that determines which items are disabled. Disabled items cannot be dragged but are valid sort targets.
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder Disabled(string selector)
        {
            Component.Disabled = selector;
            return this;
        }

        /// <summary>
        /// The selector that determines which items are sortable. Filtered items cannot be dragged and are not valid sort targets.
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder Filter(string selector)
        {
            Component.Filter = selector;
            return this;
        }

        /// <summary>
        /// The selector that determines which element will be used as a draggable handler.
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder Handler(string selector)
        {
            Component.Handler = selector;
            return this;
        }

        /// <summary>
        /// Selector that determines the container boundaries in which hint movement will be constrained to.
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder ContainerSelector(string selector)
        {
            Component.ContainerSelector = selector;
            return this;
        }

        /// <summary>
        /// The selector which determines if items from the current Sortable widget can be accepted from another Sortable container(s). The connectWith option describes one way relationship, if the developer wants a two way connection then the connectWith option should be set on both widgets.
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual SortableBuilder ConnectWith(string selector)
        {
            Component.ConnectWith = selector;
            return this;
        }

        /// <summary>
        /// When set to true, the item will be activated after the user taps and holds the finger on the element for a short amount of time.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual SortableBuilder HoldToDrag(bool value)
        {
            Component.HoldToDrag = value;
            return this;
        }

        /// <summary>
        /// Constrains the hint movement to either the horizontal (x) or vertical (y) axis.
        /// </summary>
        /// <param name="axis">The axis</param>
        /// <returns></returns>
        public virtual SortableBuilder Axis(SortableAxis axis)
        {
            Component.Axis = axis;
            return this;
        }

        /// <summary>
        /// Configures the cursor offset of Sortable widget.
        /// </summary>
        /// <param name="cursorOffsetSettingsAction">Cursor offset settings action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sortable()
        ///             .For("#sortable")
        ///             .CursorOffset(settings =>
        ///                 settings.Top(10).Left(10)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SortableBuilder CursorOffset(Action<SortableCursorOffsetSettingsBuilder> cursorOffsetSettingsAction)
        {
            cursorOffsetSettingsAction(new SortableCursorOffsetSettingsBuilder(Component.CursorOffset));

            return this;
        }

        /// <summary>
        /// HTML string representing the the hint element
        /// </summary>
        /// <param name="string">Html string</param>
        /// <returns></returns>
        public virtual SortableBuilder Hint(string content)
        {
            Component.Hint = content;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the hint for the sorted item.
        /// </summary>                
        public virtual SortableBuilder HintHandler(Func<object, object> handler)
        {
            Component.HintHandler.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the hint for the sorted item.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public virtual SortableBuilder HintHandler(string handler)
        {
            Component.HintHandler.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// HTML string representing the placeholder
        /// </summary>
        /// <param name="string">Html string</param>
        /// <returns></returns>
        public virtual SortableBuilder Placeholder(string content)
        {
            Component.Placeholder = content;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the placeholder for the sorted item.
        /// </summary>                
        public virtual SortableBuilder PlaceholderHandler(Func<object, object> handler)
        {
            Component.PlaceholderHandler.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the placeholder for the sorted item.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public virtual SortableBuilder PlaceholderHandler(string handler)
        {
            Component.PlaceholderHandler.HandlerName = handler;

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