namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileView for ASP.NET MVC.
    /// </summary>
    public class MobileViewBuilder: WidgetBuilderBase<MobileView, MobileViewBuilder>, IHideObjectMembers
    {
        private readonly MobileView container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileView"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileViewBuilder(MobileView component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Applicable to remote views only. If set to true, the remote view contents will be reloaded from the server (using Ajax) each time the view is navigated to.
        /// </summary>
        /// <param name="value">The value that configures the reload.</param>
        public MobileViewBuilder Reload(bool value)
        {
            container.Reload = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling.
		/// Useful if the view contains an image or a map.
        /// </summary>
        /// <param name="value">The value that configures the stretch.</param>
        public MobileViewBuilder Stretch(bool value)
        {
            container.Stretch = value;

            return this;
        }
        
        /// <summary>
        /// The text to display in the navbar title (if present) and the browser title.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public MobileViewBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// (available since Q1 2013)
		/// If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8).
		/// Native scrolling is only enabled on platforms that support it: iOS > 4, Android > 2, WP8. BlackBerry devices do support it, but the native scroller is flaky.
        /// </summary>
        /// <param name="value">The value that configures the usenativescrolling.</param>
        public MobileViewBuilder UseNativeScrolling(bool value)
        {
            container.UseNativeScrolling = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.
        /// </summary>
        /// <param name="value">The value that configures the zoom.</param>
        public MobileViewBuilder Zoom(bool value)
        {
            container.Zoom = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the id of the default layout
        /// </summary>
        /// <param name="value">The value that configures the layout.</param>
        public MobileViewBuilder Layout(string value)
        {
            container.Layout = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the Pane transition
        /// </summary>
        /// <param name="value">The value that configures the transition.</param>
        public MobileViewBuilder Transition(string value)
        {
            container.Transition = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
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
        public MobileViewBuilder Header(Action value)
        {
            Component.Header.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileView()
        ///       .Name("View")        
        ///        .Header(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Header &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileViewBuilder Header(Func<object, object> value)
        {
            Component.Header.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
        ///            .Name("View")
        ///            .Header("&lt;strong&gt; View Header &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileViewBuilder Header(string value)
        {

            Component.Header.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
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
        public MobileViewBuilder Content(Action value)
        {
            Component.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileView()
        ///       .Name("View")        
        ///        .Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Content &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileViewBuilder Content(Func<object, object> value)
        {
            Component.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the view content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
        ///            .Name("View")
        ///            .Content("&lt;strong&gt; View Content &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileViewBuilder Content(string value)
        {

            Component.Content.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
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
        public MobileViewBuilder Footer(Action value)
        {
            Component.Footer.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileView()
        ///       .Name("View")        
        ///        .Footer(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Footer &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileViewBuilder Footer(Func<object, object> value)
        {
            Component.Footer.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileView()
        ///            .Name("View")
        ///            .Footer("&lt;strong&gt; View Footer &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileViewBuilder Footer(string value)
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
        ///  &lt;%= Html.Kendo().MobileView()
        ///             .Name("MobileView")
        ///             .Events(events => events
        ///                 .AfterShow("onAfterShow")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileViewBuilder Events(Action<MobileViewEventBuilder> configurator)
        {

            configurator(new MobileViewEventBuilder(Component.Events));

            return this;
        }
        
    }
}

