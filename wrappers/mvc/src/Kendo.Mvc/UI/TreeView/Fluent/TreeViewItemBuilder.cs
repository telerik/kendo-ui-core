namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    using Infrastructure;    

    /// <summary>
    /// Defines the fluent interface for configuring child TreeView items.
    /// </summary>
    public class TreeViewItemBuilder : NavigationItemBuilder<TreeViewItem, TreeViewItemBuilder>, IHideObjectMembers
    {
        private readonly TreeViewItem item;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewItemBuilder"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        public TreeViewItemBuilder(TreeViewItem item, ViewContext viewContext)
            : base(item, viewContext)
        {
            
            this.item = item;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Configures the child items of a <see cref="TreeViewItem"/>.
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
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
        public virtual TreeViewItemBuilder Items(Action<TreeViewItemFactory> addAction)
        {

            TreeViewItemFactory factory = new TreeViewItemFactory(item, viewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the id of the item.
        /// </summary>
        /// <param name="value">The id.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items => items.Add().Id("42"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder Id(string id)
        {
            item.Id = id;

            return this;
        }

        /// <summary>
        /// Define when the item will be expanded on intial render.
        /// </summary>
        /// <param name="value">If true the item will be expanded.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
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
        public TreeViewItemBuilder Expanded(bool value)
        {
            item.Expanded = value;

            return this;
        }

        /// <summary>
        /// Sets the expand mode of the treeview item.
        /// </summary>
        /// <param name="value">If true then item will be loaded on demand from client side, if the treeview DataSource is properly configured.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item").Items(firstItemChildren => 
        ///                 {
        ///                     firstItemChildren.Add().Text("Child Item 1");
        ///                     firstItemChildren.Add().Text("Child Item 2");
        ///                 })
        ///                 .HasChildren(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder HasChildren(bool value)
        {
            item.HasChildren = value;

            return this;
        }
    }
}