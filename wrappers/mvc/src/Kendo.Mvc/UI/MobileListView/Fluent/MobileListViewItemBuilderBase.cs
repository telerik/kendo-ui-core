namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Kendo.Mvc.Extensions;

    public abstract class MobileListViewItemBuilderBase<TItem, TItemBuilder> : IHideObjectMembers 
        where TItem : MobileListViewItemBase
        where TItemBuilder : MobileListViewItemBuilderBase<TItem, TItemBuilder>
    {
        public MobileListViewItemBuilderBase(TItem container)
        {
            Item = container;
        }

        protected TItem Item
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the text of the item.
        /// </summary>
        /// <param name="attributes">Sets the text of the item.</param>
        /// <returns></returns>
        public virtual TItemBuilder Text(string value)
        {
            Item.Content.Html = value;

            return this as TItemBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TItemBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            Item.HtmlAttributes.Clear();
            Item.HtmlAttributes.Merge(attributes);

            return this as TItemBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TItemBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }   

        /// <summary>
        /// Sets the HTML content which the item should display.
        /// </summary>
        /// <param name="value">The action which renders the item content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileListViewView()
        ///            .Name("View")
        ///            .Items(items => 
        ///            {
        ///                 items.Add().Content(() =>
        ///                          {
        ///                              %&gt;
        ///                                  &lt;strong&gt; Item Content &lt;/strong&gt;
        ///                              &lt;%
        ///                          });
        ///             })
        ///            .Render();
        /// %&gt;
        /// </code>
        public TItemBuilder Content(Action value)
        {
            Item.Content.Content = value;

            return this as TItemBuilder;
        }

        /// <summary>
        /// Sets the HTML content which the item should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Kendo().MobileListView()
        ///       .Name("View")  
        ///       .Items(items => 
        ///       {
        ///         items.Add().Content(
        ///             @&lt;text&gt;
        ///                     Some text
        ///                     &lt;strong&gt; Item Content &lt;/strong&gt;
        ///             &lt;/text&gt;        
        ///       )
        ///       })
        ///  )
        /// </code>
        public TItemBuilder Content(Func<object, object> value)
        {
            Item.Content.InlineTemplate = value;

            return this as TItemBuilder;
        }

        /// <summary>
        /// The icon of the link item. It can be either one of the built-in icons, or a custom one.
        /// </summary>
        /// <param name="value">The value that configures the icon.</param>
        public TItemBuilder Icon(string value)
        {
            Item.Icon = value;

            return this as TItemBuilder;
        }
    }   
}
