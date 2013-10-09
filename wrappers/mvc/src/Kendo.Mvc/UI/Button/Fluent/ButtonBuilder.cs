namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="Button{T}"/>component.</summary>
    public class ButtonBuilder : WidgetBuilderBase<Button, ButtonBuilder>, IHideObjectMembers
    {
        /// <summary>Initializes a new instance of the <see cref="SliderBuilder{T}"/>class.</summary>
        /// <param name="component">The component.</param>
        public ButtonBuilder(Button component)
            : base(component)
        { }

        /// <summary>
        /// Sets the HTML content of the Button.
        /// </summary>
        /// <param name="content">The action which renders the HTML content.</param>
        /// <code lang="CS">
        ///  &lt;%  Html.Kendo().Button()
        ///             .Name("Button1")
        ///             .Content(() =&gt; { &gt;%
        ///                   &lt;p&gt;Content&lt;/p&gt;
        ///              %&lt;})
        ///             .Render();
        /// %&gt;
        /// </code>        
        public ButtonBuilder Content(Action content)
        {
            Component.Template.Content = content;

            return this;
        }

        /// <summary>
        /// Sets the HTML content of the Button.
        /// </summary>
        /// <param name="content">The Razor template for the HTML content.</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().Button()
        ///        .Name("Button1")
        ///        .Content(@&lt;p&gt;Content&lt;/p&gt;)
        ///        .Render();)
        /// </code>        
        public ButtonBuilder Content(Func<object, object> content)
        {
            Component.Template.InlineTemplate = content;

            return this;
        }

        /// <summary>
        /// Sets the HTML content of the Button.
        /// </summary>
        /// <param name="content">The HTML content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Button()
        ///          .Name("Button")
        ///           .Content("&lt;p&gt;Content&lt;/p&gt;")
        /// %&gt;
        /// </code>        
        public ButtonBuilder Content(string content)
        {
            Component.Template.Html = content;

            return this;
        }

        /// <summary>Sets whether Button should be enabled.</summary>
        public ButtonBuilder Enable(bool value)
        {
            Component.Enable = value;

            return this;
        }

        /// <summary>Sets the icon name of the Button.</summary>
        public ButtonBuilder Icon(string icon)
        {
            Component.Icon = icon;

            return this;
        }

        /// <summary>Sets the image URL of the Button.</summary>
        public ButtonBuilder ImageUrl(string url)
        {
            Component.ImageUrl = url;

            return this;
        }

        /// <summary>Sets the sprite CSS class(es) of the Button.</summary>
        public ButtonBuilder SpriteCssClass(string cssClass)
        {
            Component.SpriteCssClass = cssClass;

            return this;
        }

        /// <summary>Configures the client-side events.</summary>
        /// <param name="events">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Button()
        ///            .Name("Button")
        ///            .Events(events =>
        ///                events.Click("onClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ButtonBuilder Events(Action<ButtonEventBuilder> events)
        {
            events(new ButtonEventBuilder(Component.Events));

            return this;
        }

        /// <summary>Sets the Button HTML tag. A button tag is used by default.</summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Button()
        ///            .Name("Button")
        ///            .Tag("span")
        /// %&gt;
        /// </code>
        /// </example>
        public ButtonBuilder Tag(string tag)
        {
            Component.Tag = tag;

            return this;
        }

    }
}