namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileBackButtonBuilder: WidgetBuilderBase<MobileBackButton, MobileBackButtonBuilder>, IHideObjectMembers
    {
        private readonly MobileBackButton container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileBackButton"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileBackButtonBuilder(MobileBackButton component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The icon of the button. It can be either one of the built-in icons, or a custom one
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public MobileBackButtonBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the button
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public MobileBackButtonBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileBackButton()
        ///             .Name("MobileBackButton")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileBackButtonBuilder Events(Action<MobileBackButtonEventBuilder> configurator)
        {

            configurator(new MobileBackButtonEventBuilder(Component.Events));

            return this;
        }
        
    }
}

