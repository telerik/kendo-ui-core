namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileModalViewBuilder: WidgetBuilderBase<MobileModalView, MobileModalViewBuilder>, IHideObjectMembers
    {
        private readonly MobileModalView container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileModalView"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileModalViewBuilder(MobileModalView component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// When set to false, the ModalView will close when the user taps outside of its element.
        /// </summary>
        /// <param name="value">The value that configures the modal.</param>
        public MobileModalViewBuilder Modal(bool value)
        {
            container.Modal = value;

            return this;
        }
        
        /// <summary>
        /// The height of the ModalView container in pixels. If not set, the element style is used.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobileModalViewBuilder Height(string value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The width of the ModalView container in pixels. If not set, the element style is used.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobileModalViewBuilder Width(string value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.
        /// </summary>
        /// <param name="value">The value that configures the zoom.</param>
        public MobileModalViewBuilder Zoom(bool value)
        {
            container.Zoom = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling. Useful if the view contains an image or a map.
        /// </summary>
        /// <param name="value">The value that configures the stretch.</param>
        public MobileModalViewBuilder Stretch(bool value)
        {
            container.Stretch = value;

            return this;
        }
        
        /// <summary>
        /// (available since Q1 2013) If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8). Native scrolling is only enabled on platforms that support it: iOS > 4, Android > 2, WP8. BlackBerry devices do support it, but the native scroller is flaky.
        /// </summary>
        /// <param name="value">The value that configures the usenativescrolling.</param>
        public MobileModalViewBuilder UseNativeScrolling(bool value)
        {
            container.UseNativeScrolling = value;

            return this;
        }
        
        /// <summary>
        /// The text to display in the navbar title (if present) and the browser title.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public MobileModalViewBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The height of the ModalView in pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobileModalViewBuilder Height(int value)
        {
            container.Height = value + "px";

            return this;
        }

        /// <summary>
        /// The width of the ModalView in pixels
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobileModalViewBuilder Width(int value)
        {
            container.Width = value + "px";

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Header(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Header &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Header(Action value)
        {
            Component.Header.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileModalView()
        ///       .Name("View")        
        ///        .Header(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Header &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileModalViewBuilder Header(Func<object, object> value)
        {
            Component.Header.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Header("&lt;strong&gt; View Header &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Header(string value)
        {

            Component.Header.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Content(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Content &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Content(Action value)
        {
            Component.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileModalView()
        ///       .Name("View")        
        ///        .Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Content &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileModalViewBuilder Content(Func<object, object> value)
        {
            Component.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the view content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Content("&lt;strong&gt; View Content &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Content(string value)
        {

            Component.Content.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Footer(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Footer &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Footer(Action value)
        {
            Component.Footer.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileModalView()
        ///       .Name("View")        
        ///        .Footer(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Footer &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileModalViewBuilder Footer(Func<object, object> value)
        {
            Component.Footer.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileModalView()
        ///            .Name("View")
        ///            .Footer("&lt;strong&gt; View Footer &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileModalViewBuilder Footer(string value)
        {

            Component.Footer.Html = value;

            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileModalView()
        ///             .Name("MobileModalView")
        ///             .Events(events => events
        ///                 .Close("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileModalViewBuilder Events(Action<MobileModalViewEventBuilder> configurator)
        {

            configurator(new MobileModalViewEventBuilder(Component.Events));

            return this;
        }
        
    }
}

