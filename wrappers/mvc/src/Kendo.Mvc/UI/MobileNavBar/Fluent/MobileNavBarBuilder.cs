namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileNavBarBuilder: WidgetBuilderBase<MobileNavBar, MobileNavBarBuilder>, IHideObjectMembers
    {
        private readonly MobileNavBar container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileNavBar"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileNavBarBuilder(MobileNavBar component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        //<< Fields

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileNavBar()
        ///            .Name("NavBar")
        ///            .Content(() =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;strong&gt; View Title &lt;/strong&gt;
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileNavBarBuilder Content(Action value)
        {
            Component.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileNavBar()
        ///            .Name("NavBar")
        ///            .Content((navbar) =>
        ///                     {
        ///                         %&gt;
        ///                             &lt;= navbar.ViewTitle("View Title")&gt;        
        ///                         &lt;%
        ///                     })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileNavBarBuilder Content(Action<MobileNavBar> value)
        {
            Component.Content.Content = () => value(Component);

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileNavBar()
        ///       .Name("NavBar")        
        ///        .Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; View Title &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileNavBarBuilder Content(Func<object, object> value)
        {
            Component.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileNavBar()
        ///       .Name("NavBar")        
        ///        .Content(@navbar => 
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     @navbar.ViewTitle("View Title")
        ///             &lt;/text&gt;        
        ///       )
        ///  )
        /// </code>
        public MobileNavBarBuilder Content(Func<MobileNavBar, Func<object, object>> value)
        {
            Component.Content.InlineTemplate = (dataItem) => value(Component)(dataItem);

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the view content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileNavBar()
        ///            .Name("NavBar")
        ///            .Content("&lt;strong&gt; View Title &lt;/strong&gt;");        
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileNavBarBuilder Content(string value)
        {

            Component.Content.Html = value;

            return this;
        }
        
    }
}

