namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;
    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring child menu items.
    /// </summary>
    public class ContextMenuItemBuilder : NavigationItemBuilder<ContextMenuItem, ContextMenuItemBuilder>, IHideObjectMembers
    {
        private readonly ContextMenuItem item;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContextMenuItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        public ContextMenuItemBuilder(ContextMenuItem item, ViewContext viewContext)
            : base(item, viewContext)
        {

            this.item = item;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Configures the child items of a <see cref="ContextMenuItem"/>.
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
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
        public virtual ContextMenuItemBuilder Items(Action<ContextMenuItemFactory> addAction)
        {

            ContextMenuItemFactory factory = new ContextMenuItemFactory(item, viewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the child items of a <see cref="ContextMenuItem"/>.
        /// When declaratively binding the menu item, use <see cref="Items(Action<ContextMenuItemFactory>)"/>.
        /// </summary>
        /// <param name="items">items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Items(model);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ContextMenuItemBuilder Items(IEnumerable<ContextMenuItem> items)
        {

            item.Items.Clear();

            (items as List<ContextMenuItem>).ForEach(menuItem => item.Items.Add(menuItem));

            return this;
        }

        /// <summary>
        /// Renders a separator item
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ContextMenu()
        ///             .Name("ContextMenu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Separator(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ContextMenuItemBuilder Separator(bool value)
        {
            item.Separator = value;

            return this;
        }

    }
}