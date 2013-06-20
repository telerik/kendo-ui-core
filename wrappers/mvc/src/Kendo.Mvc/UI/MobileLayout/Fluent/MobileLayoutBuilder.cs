namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileLayout for ASP.NET MVC.
    /// </summary>
    public class MobileLayoutBuilder: WidgetBuilderBase<MobileLayout, MobileLayoutBuilder>, IHideObjectMembers
    {
        private readonly MobileLayout container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileLayout"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileLayoutBuilder(MobileLayout component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The specific platform this layout targets. By default, layouts are displayed
		/// on all platforms.
        /// </summary>
        /// <param name="value">The value that configures the platform.</param>
        public MobileLayoutBuilder Platform(string value)
        {
            container.Platform = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileLayout()
        ///            .Name("Layout")
        ///            .Header(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Header &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileLayoutBuilder Header(Action value)
        {
            container.Header.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileLayout()
        ///       .Name("Layout")        
        ///        .Header(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Header &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileLayoutBuilder Header(Func<object, object> value)
        {
            container.Header.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the header should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the header.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileLayout()
        ///            .Name("Layout")
        ///            .Header("&lt;strong&gt; View Header &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileLayoutBuilder Header(string value)
        {

            container.Header.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileLayout()
        ///            .Name("Layout")
        ///            .Footer(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Footer &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileLayoutBuilder Footer(Action value)
        {
            container.Footer.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileLayout()
        ///       .Name("Layout")        
        ///        .Footer(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Footer &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileLayoutBuilder Footer(Func<object, object> value)
        {
            container.Footer.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the footer should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the footer.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileLayout()
        ///            .Name("Layout")
        ///            .Footer("&lt;strong&gt; View Footer &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileLayoutBuilder Footer(string value)
        {

            container.Footer.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the Header HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileLayoutBuilder HeaderHtmlAttributes(object attributes)
        {
            return HeaderHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the Footer HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileLayoutBuilder FooterHtmlAttributes(object attributes)
        {
            return FooterHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the Header HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileLayoutBuilder HeaderHtmlAttributes(IDictionary<string, object> attributes)
        {
            container.HeaderHtmlAttributes.Clear();
            container.HeaderHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the Footer HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileLayoutBuilder FooterHtmlAttributes(IDictionary<string, object> attributes)
        {
            container.FooterHtmlAttributes.Clear();
            container.FooterHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileLayout()
        ///             .Name("MobileLayout")
        ///             .Events(events => events
        ///                 .Hide("onHide")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileLayoutBuilder Events(Action<MobileLayoutEventBuilder> configurator)
        {

            configurator(new MobileLayoutEventBuilder(Component.Events));

            return this;
        }
        
    }
}

