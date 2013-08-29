namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileButtonGroup for ASP.NET MVC.
    /// </summary>
    public class MobileButtonGroupBuilder: WidgetBuilderBase<MobileButtonGroup, MobileButtonGroupBuilder>, IHideObjectMembers
    {
        private readonly MobileButtonGroup container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileButtonGroup"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileButtonGroupBuilder(MobileButtonGroup component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the initially selected Button (zero based index).
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public MobileButtonGroupBuilder Index(int value)
        {
            container.Index = value;

            return this;
        }
        
        /// <summary>
        /// Sets the DOM event used to select the button. Accepts "up" as an alias for touchend, mouseup and MSPointerUp vendor specific events.By default, buttons are selected immediately after the user presses the button (on touchstart or mousedown or MSPointerDown, depending on the mobile device).
		/// However, if the widget is placed in a scrollable view, the user may accidentally press the button when scrolling. In such cases, it is recommended to set this option to "up".
        /// </summary>
        /// <param name="value">The value that configures the selecton.</param>
        public MobileButtonGroupBuilder SelectOn(string value)
        {
            container.SelectOn = value;

            return this;
        }
        
        /// <summary>
        /// Contains the items of the button group widget
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public MobileButtonGroupBuilder Items(Action<MobileButtonGroupItemFactory> configurator)
        {
            configurator(new MobileButtonGroupItemFactory(container.Items));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileButtonGroup()
        ///             .Name("MobileButtonGroup")
        ///             .Events(events => events
        ///                 .Select("onSelect")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileButtonGroupBuilder Events(Action<MobileButtonGroupEventBuilder> configurator)
        {

            configurator(new MobileButtonGroupEventBuilder(Component.Events));

            return this;
        }
        
    }
}

