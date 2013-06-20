namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileSwitch for ASP.NET MVC.
    /// </summary>
    public class MobileSwitchBuilder: WidgetBuilderBase<MobileSwitch, MobileSwitchBuilder>, IHideObjectMembers
    {
        private readonly MobileSwitch container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileSwitch"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileSwitchBuilder(MobileSwitch component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The checked state of the widget.
        /// </summary>
        /// <param name="value">The value that configures the checked.</param>
        public MobileSwitchBuilder Checked(bool value)
        {
            container.Checked = value;

            return this;
        }
        
        /// <summary>
        /// The OFF label.
        /// </summary>
        /// <param name="value">The value that configures the offlabel.</param>
        public MobileSwitchBuilder OffLabel(string value)
        {
            container.OffLabel = value;

            return this;
        }
        
        /// <summary>
        /// The ON label.
        /// </summary>
        /// <param name="value">The value that configures the onlabel.</param>
        public MobileSwitchBuilder OnLabel(string value)
        {
            container.OnLabel = value;

            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileSwitch()
        ///             .Name("MobileSwitch")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileSwitchBuilder Events(Action<MobileSwitchEventBuilder> configurator)
        {

            configurator(new MobileSwitchEventBuilder(Component.Events));

            return this;
        }
        
    }
}

