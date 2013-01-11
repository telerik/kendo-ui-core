namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TabStrip"/> component.
    /// </summary>
    public class TabStripBuilder : WidgetBuilderBase<TabStrip, TabStripBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TabStripBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TabStripBuilder(TabStrip component) : base(component)
        {
        }

        /// <summary>
        /// Defines the items in the tabstrip
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder Items(Action<TabStripItemFactory> addAction)
        {

            TabStripItemFactory factory = new TabStripItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .Events(events =>
        ///                 events.Select("onSelect").OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder Events(Action<TabStripEventBuilder> clientEventsAction)
        {

            clientEventsAction(new TabStripEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the tabstrip.
        /// </summary>
        /// <param name="enable">Whether the component animation is enabled.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TabStrip()
        ///             .Name("PanelBar")
        ///             .Animation(false)
        /// </code>
        /// </example>
        public TabStripBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the tabstrip.
        /// </summary>
        /// <param name="animationAction">The action that configures the animation.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().TabStrip()
        ///             .Name("PanelBar")
        ///             .Animation(animation => animation.Open(config => config.Fade(FadeDirection.In)))
        /// </code>
        /// </example>
        public TabStripBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Binds the tabstrip to a sitemap
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <param name="siteMapAction">The action to configure the item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .BindTo("examples", (item, siteMapNode) =>
        ///             {
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder BindTo(string viewDataKey, Action<TabStripItem, SiteMapNode> siteMapAction)
        {

            Component.BindTo(viewDataKey, siteMapAction);

            return this;
        }

        /// <summary>
        /// Binds the tabstrip to a sitemap.
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .BindTo("examples")
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder BindTo(string viewDataKey)
        {

            Component.BindTo(viewDataKey);

            return this;
        }

        /// <summary>
        /// Binds the tabstrip to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="itemDataBound">The action executed for every data bound item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .BindTo(new []{"First", "Second"}, (item, value)
        ///             {
        ///                item.Text = value;
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder BindTo<T>(IEnumerable<T> dataSource, Action<TabStripItem, T> itemDataBound)
        {
            Component.BindTo(dataSource, itemDataBound);

            return this;
        }

        /// <summary>
        /// Selects the item at the specified index.
        /// </summary>
        /// <param name="index">The index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        ///             .SelectedIndex(1)
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder SelectedIndex(int index)
        {
            Component.SelectedIndex = index;

            return this;
        }

        /// <summary>
        /// Callback for each item.
        /// </summary>
        /// <param name="action">Action, which will be executed for each item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .ItemAction(item =>
        ///             {
        ///                 item
        ///                     .Text(...)
        ///                     .HtmlAttributes(...);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder ItemAction(Action<TabStripItem> action)
        {
            Component.ItemAction = action;

            return this;
        }

        /// <summary>
        /// Select item depending on the current URL.
        /// </summary>
        /// <param name="value">If true the item will be highlighted.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .HighlightPath(true)
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder HighlightPath(bool value)
        {
            Component.HighlightPath = value;

            return this;
        }

        /// <summary>
        /// Enable/disable security trimming functionality of the component.
        /// </summary>
        /// <param name="value">If true security trimming is enabled.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .SecurityTrimming(false)
        /// %&gt;
        /// </code>
        /// </example>
        public TabStripBuilder SecurityTrimming(bool value)
        {
            Component.SecurityTrimming.Enabled = value;

            return this;
        }
    }
}