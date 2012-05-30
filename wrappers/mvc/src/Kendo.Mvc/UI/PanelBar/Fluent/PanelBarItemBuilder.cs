namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring child panelbar items.
    /// </summary>
    public class PanelBarItemBuilder : ContentNavigationItemBuilder<PanelBarItem, PanelBarItemBuilder>, IHideObjectMembers
    {
        private readonly PanelBarItem item;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="PanelBarItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="viewContext">The context of the View.</param>
        public PanelBarItemBuilder(PanelBarItem item, ViewContext viewContext)
            : base(item, viewContext)
        {

            this.item = item;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Configures the child items of a <see cref="PanelBarItem"/>.
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Items(firstItemChildren => 
        ///                 {
        ///                     firstItemChildren.Add().Text("Child Item 1");
        ///                     firstItemChildren.Add().Text("Child Item 2");
        ///                 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarItemBuilder Items(Action<PanelBarItemFactory> addAction)
        {

            var factory = new PanelBarItemFactory(item, viewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Define when the item will be expanded on intial render.
        /// </summary>
        /// <param name="value">If true the item will be expanded.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Items(firstItemChildren => 
        ///                 {
        ///                     firstItemChildren.Add().Text("Child Item 1");
        ///                     firstItemChildren.Add().Text("Child Item 2");
        ///                 })
        ///                 .Expanded(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarItemBuilder Expanded(bool value)
        {
            item.Expanded = value;

            return this;
        }
    }
}
