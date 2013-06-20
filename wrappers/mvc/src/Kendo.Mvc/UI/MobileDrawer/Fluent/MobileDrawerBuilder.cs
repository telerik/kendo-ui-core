namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileDrawer for ASP.NET MVC.
    /// </summary>
    public class MobileDrawerBuilder: WidgetBuilderBase<MobileDrawer, MobileDrawerBuilder>, IHideObjectMembers
    {
        private readonly MobileDrawer container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileDrawer"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileDrawerBuilder(MobileDrawer component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The text to display in the navbar title (if present).
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public MobileDrawerBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The position of the drawer. Can be left (default) or right.
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public MobileDrawerBuilder Position(MobileDrawerPosition value)
        {
            container.Position = value;

            return this;
        }
        
        //<< Fields

        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Header(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; Drawer Header &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Header(Action value)
        {
            Component.Header.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileDrawer()
        ///       .Name("Drawer")        
        ///        .Header(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; Drawer Header &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileDrawerBuilder Header(Func<object, object> value)
        {
            Component.Header.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Header("&lt;strong&gt; Drawer Header &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Header(string value)
        {

            Component.Header.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Content(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; Drawer Content &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Content(Action value)
        {
            Component.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileDrawer()
        ///       .Name("Drawer")        
        ///        .Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; Drawer Content &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileDrawerBuilder Content(Func<object, object> value)
        {
            Component.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the view content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Content("&lt;strong&gt; Drawer Content &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Content(string value)
        {

            Component.Content.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Footer(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; Drawer Footer &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Footer(Action value)
        {
            Component.Footer.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileDrawer()
        ///       .Name("Drawer")        
        ///        .Footer(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; Drawer Footer &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileDrawerBuilder Footer(Func<object, object> value)
        {
            Component.Footer.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileDrawer()
        ///            .Name("Drawer")
        ///            .Footer("&lt;strong&gt; Drawer Footer &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileDrawerBuilder Footer(string value)
        {

            Component.Footer.Html = value;

            return this;
        }

        /// <summary>
        /// A list of the view ids on which the drawer will appear. If omitted, the drawer can be revealed on any view in the application.
        /// </summary>
        /// <param name="names">The list of view ids on which the drawer will appear.</param>        
        public MobileDrawerBuilder Views(params string[] names)
        {
            Component.Views = names;

            return this;
        }
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileDrawer()
        ///             .Name("MobileDrawer")
        ///             .Events(events => events
        ///                 .BeforeShow("onBeforeShow")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileDrawerBuilder Events(Action<MobileDrawerEventBuilder> configurator)
        {

            configurator(new MobileDrawerEventBuilder(Component.Events));

            return this;
        }
        
    }
}

