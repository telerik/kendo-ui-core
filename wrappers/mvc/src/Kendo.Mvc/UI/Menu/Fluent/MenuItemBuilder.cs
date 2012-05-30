namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;
    using Infrastructure;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring child menu items.
    /// </summary>
    public class MenuItemBuilder : NavigationItemBuilder<MenuItem, MenuItemBuilder>, IHideObjectMembers
    {
        private readonly MenuItem item;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        public MenuItemBuilder(MenuItem item, ViewContext viewContext)
            : base(item, viewContext)
        {

            this.item = item;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Configures the child items of a <see cref="MenuItem"/>.
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
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
        public virtual MenuItemBuilder Items(Action<MenuItemFactory> addAction)
        {

            MenuItemFactory factory = new MenuItemFactory(item, viewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Configures the child items of a <see cref="MenuItem"/>.
        /// When declaratively binding the menu item, use <see cref="Items(Action<MenuItemFactory>)"/>.
        /// </summary>
        /// <param name="items">items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Items(model);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuItemBuilder Items(IEnumerable<MenuItem> items)
        {

            item.Items.Clear();

            (items as List<MenuItem>).ForEach(menuItem => item.Items.Add(menuItem));

            return this;
        }
    }
}