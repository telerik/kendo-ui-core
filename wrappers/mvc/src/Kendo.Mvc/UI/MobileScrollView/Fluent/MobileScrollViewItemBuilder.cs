namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobileScrollViewItem settings.
    /// </summary>
    public class MobileScrollViewItemBuilder: IHideObjectMembers
    {
        private readonly MobileScrollViewItem container;

        public MobileScrollViewItemBuilder(MobileScrollViewItem settings)
        {
            container = settings;
        }        
        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileScrollViewItemBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MobileScrollViewItemBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileScrollView()
        ///            .Name("View")
        ///            .Items(items => items.Add()
        ///                 .Content(() =>
        ///                          {
        ///                              %&gt;
        ///                                  &lt;strong&gt; View Content &lt;/strong&gt;
        ///                              &lt;%
        ///                          })
        ///             )
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileScrollViewItemBuilder Content(Action value)
        {
            container.Content.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the content should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileScrollView()
        ///       .Name("View") 
        ///       .Items(items => items.Add()
        ///              .Content(
        ///                   @&lt;text&gt;
        ///                           Some text
        ///                           &lt;strong&gt; View Content &lt;/strong&gt;
        ///                   &lt;/text&gt;      
        ///             )
        ///       )
        ///  )
        /// </code>
        public MobileScrollViewItemBuilder Content(Func<object, object> value)
        {
            container.Content.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the view content should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the view content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileScrollView()
        ///            .Name("View")
        ///            .Items(items => items.Add()
        ///                 .Content("&lt;strong&gt; View Content &lt;/strong&gt;"))
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileScrollViewItemBuilder Content(string value)
        {

            container.Content.Html = value;

            return this;
        }
    }
}

