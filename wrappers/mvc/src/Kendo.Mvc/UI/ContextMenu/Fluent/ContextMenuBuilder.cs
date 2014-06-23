namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ContextMenu for ASP.NET MVC.
    /// </summary>
    public class ContextMenuBuilder: WidgetBuilderBase<ContextMenu, ContextMenuBuilder>
    {
        private readonly ContextMenu container;
        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenu"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ContextMenuBuilder(ContextMenu component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies that ContextMenu should be shown aligned to the target or the filter element if specified.
        /// </summary>
        /// <param name="value">The value that configures the aligntoanchor.</param>
        public ContextMenuBuilder AlignToAnchor(bool value)
        {
            container.AlignToAnchor = value;

            return this;
        }
        
        /// <summary>
        /// A collection of Animation objects, used to change default animations. A value of false will disable all animations in the widget.Available animations for the ContextMenu are listed below.  Each animation has a reverse options which is used for the close effect by default, but can be over-ridden
		/// by setting the close animation. Each animation also has a direction which can be set off the animation (i.e. slideIn:Down).
        /// </summary>
        /// <param name="configurator">The action that configures the animation.</param>
        public ContextMenuBuilder Animation(Action<ContextMenuAnimationSettingsBuilder> configurator)
        {
            configurator(new ContextMenuAnimationSettingsBuilder(container.Animation));
            return this;
        }
        
        /// <summary>
        /// Specifies that sub menus should close after item selection (provided they won't navigate).
        /// </summary>
        /// <param name="value">The value that configures the closeonclick.</param>
        public ContextMenuBuilder CloseOnClick(bool value)
        {
            container.CloseOnClick = value;

            return this;
        }
        
        /// <summary>
        /// Specifies ContextMenu sub menu opening direction. Can be "top", "bottom", "left", "right".
		/// The example below will initialize the sub menus to open to the left.
        /// </summary>
        /// <param name="value">The value that configures the direction.</param>
        public ContextMenuBuilder Direction(string value)
        {
            container.Direction = value;

            return this;
        }
        
        /// <summary>
        /// Specifies ContextMenu filter selector - the ContextMenu will only be shown on items that satisfy the provided selector.
        /// </summary>
        /// <param name="value">The value that configures the filter.</param>
        public ContextMenuBuilder Filter(string value)
        {
            container.Filter = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the delay in ms before the sub menus are opened/closed - used to avoid accidental closure on leaving.
        /// </summary>
        /// <param name="value">The value that configures the hoverdelay.</param>
        public ContextMenuBuilder HoverDelay(double value)
        {
            container.HoverDelay = value;

            return this;
        }
        
        /// <summary>
        /// Root menu orientation. Could be horizontal or vertical.
        /// </summary>
        /// <param name="value">The value that configures the orientation.</param>
        public ContextMenuBuilder Orientation(string value)
        {
            container.Orientation = value;

            return this;
        }
        
        /// <summary>
        /// Specifies how ContextMenu should adjust to screen boundaries. By default the strategy is "fit" for a sub menu with a horizontal parent or the root menu,
		/// meaning it will move to fit in screen boundaries in all directions, and "fit flip" for a sub menu with vertical parent, meaning it will fit vertically and flip over
		/// its parent horizontally. You can also switch off the screen boundary detection completely if you set the popupCollision to false.
        /// </summary>
        /// <param name="value">The value that configures the popupcollision.</param>
        public ContextMenuBuilder PopupCollision(string value)
        {
            container.PopupCollision = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the event or events on which ContextMenu should open. By default ContextMenu will show on contextmenu event on desktop and hold event on touch devices.
		/// Could be any pointer/mouse/touch event, also several, separated by spaces.
        /// </summary>
        /// <param name="value">The value that configures the showon.</param>
        public ContextMenuBuilder ShowOn(string value)
        {
            container.ShowOn = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the element on which ContextMenu should open. The default element is the document body.
        /// </summary>
        /// <param name="value">The value that configures the target.</param>
        public ContextMenuBuilder Target(string value)
        {
            container.Target = value;

            return this;
        }
        
        /// <summary>
        /// Contains the items of the menu widget
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public ContextMenuBuilder Items(Action<ContextMenuItemFactory> configurator)
        {
            configurator(new ContextMenuItemFactory(container.Items));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Events(events => events
        ///                 .Close("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuBuilder Events(Action<ContextMenuEventBuilder> configurator)
        {

            configurator(new ContextMenuEventBuilder(Component.Events));

            return this;
        }
        
    }
}

