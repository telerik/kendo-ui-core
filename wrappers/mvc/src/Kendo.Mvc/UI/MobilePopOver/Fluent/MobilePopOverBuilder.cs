namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobilePopOverBuilder: WidgetBuilderBase<MobilePopOver, MobilePopOverBuilder>, IHideObjectMembers
    {
        private readonly MobilePopOver container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobilePopOver"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobilePopOverBuilder(MobilePopOver component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The pane configuration options.
        /// </summary>
        /// <param name="configurator">The action that configures the pane.</param>
        public MobilePopOverBuilder Pane(Action<MobilePopOverPaneSettingsBuilder> configurator)
        {
            configurator(new MobilePopOverPaneSettingsBuilder(container.Pane));
            return this;
        }
        
        /// <summary>
        /// The popup configuration options (tablet only)
        /// </summary>
        /// <param name="configurator">The action that configures the popup.</param>
        public MobilePopOverBuilder Popup(Action<MobilePopOverPopupSettingsBuilder> configurator)
        {
            configurator(new MobilePopOverPopupSettingsBuilder(container.Popup));
            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobilePopOver()
        ///            .Name("PopOver")
        ///            .Content(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; PopOver Content &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobilePopOverBuilder Content(Action value)
        {
            Component.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobilePopOver()
        ///       .Name("PopOver")        
        ///        .Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; PopOver Content &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobilePopOverBuilder Content(Func<object, object> value)
        {
            Component.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the popover content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobilePopOver()
        ///            .Name("PopOver")
        ///            .Content("&lt;strong&gt; PopOver Content &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobilePopOverBuilder Content(string value)
        {

            Component.Content.Html = value;

            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobilePopOver()
        ///             .Name("MobilePopOver")
        ///             .Events(events => events
        ///                 .Close("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobilePopOverBuilder Events(Action<MobilePopOverEventBuilder> configurator)
        {

            configurator(new MobilePopOverEventBuilder(Component.Events));

            return this;
        }
        
    }
}

