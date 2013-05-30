namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileDetailButtonBuilder: WidgetBuilderBase<MobileDetailButton, MobileDetailButtonBuilder>, IHideObjectMembers
    {
        private readonly MobileDetailButton container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileDetailButton"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileDetailButtonBuilder(MobileDetailButton component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)
        /// </summary>
        /// <param name="value">The value that configures the href.</param>
        public MobileDetailButtonBuilder Href(string value)
        {
            container.Href = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the Pane transition
        /// </summary>
        /// <param name="value">The value that configures the transition.</param>
        public MobileDetailButtonBuilder Transition(string value)
        {
            container.Transition = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the id of target Pane or `_top` for application level Pane
        /// </summary>
        /// <param name="value">The value that configures the target.</param>
        public MobileDetailButtonBuilder Target(string value)
        {
            container.Target = value;

            return this;
        }
        
        /// <summary>
        /// This value will be available when the action callback of ActionSheet item is executed
        /// </summary>
        /// <param name="value">The value that configures the actionsheetcontext.</param>
        public MobileDetailButtonBuilder ActionsheetContext(string value)
        {
            container.ActionsheetContext = value;

            return this;
        }
        
        /// <summary>
        /// The icon of the button. It can be either one of the built-in icons, or a custom one.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public MobileDetailButtonBuilder Icon(string value)
        {
            container.Icon = value;

            return this;
        }
        
        /// <summary>
        /// Specifies predefined button style
        /// </summary>
        /// <param name="value">The value that configures the style.</param>
        public MobileDetailButtonBuilder Style(MobileDetailButtonStyle value)
        {
            container.Style = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Use the align data attribute to specify the elements position inside the NavBar. By default, elements without any align are centered.
        /// </summary>
        /// <param name="value">The value that configures the align.</param>
        public MobileDetailButtonBuilder Align(MobileButtonAlign value)
        {
            container.Align = value;

            return this;
        }

        /// <summary>
        /// Specifies the widget to be open when is tapped (the href must be set too)
        /// </summary>
        /// <param name="value">The value that configures the rel.</param>
        public MobileDetailButtonBuilder Rel(MobileButtonRel value)
        {
            container.Rel = value;

            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileDetailButton()
        ///             .Name("MobileDetailButton")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileDetailButtonBuilder Events(Action<MobileDetailButtonEventBuilder> configurator)
        {

            configurator(new MobileDetailButtonEventBuilder(Component.Events));

            return this;
        }
        
    }
}

