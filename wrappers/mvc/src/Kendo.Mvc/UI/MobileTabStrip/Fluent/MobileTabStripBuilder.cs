namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileTabStripBuilder: WidgetBuilderBase<MobileTabStrip, MobileTabStripBuilder>, IHideObjectMembers
    {
        private readonly MobileTabStrip container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileTabStrip"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileTabStripBuilder(MobileTabStrip component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The index of the initially selected tab.
        /// </summary>
        /// <param name="value">The value that configures the selectedindex.</param>
        public MobileTabStripBuilder SelectedIndex(int value)
        {
            container.SelectedIndex = value;

            return this;
        }
        
        /// <summary>
        /// Contains the items of the tabstrip widget
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public MobileTabStripBuilder Items(Action<MobileTabStripItemFactory> configurator)
        {
            configurator(new MobileTabStripItemFactory(container.Items));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileTabStrip()
        ///             .Name("MobileTabStrip")
        ///             .Events(events => events
        ///                 .Select("onSelect")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileTabStripBuilder Events(Action<MobileTabStripEventBuilder> configurator)
        {

            configurator(new MobileTabStripEventBuilder(Component.Events));

            return this;
        }
        
    }
}

