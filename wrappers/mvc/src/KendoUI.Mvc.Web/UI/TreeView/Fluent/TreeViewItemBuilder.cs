// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
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
            Guard.IsNotNull(item, "item");
            Guard.IsNotNull(viewContext, "viewContext");
            
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
            Guard.IsNotNull(addAction, "addAction");

            TreeViewItemFactory factory = new TreeViewItemFactory(item, viewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Sets the value for the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items => items.Add().Value("1"))
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder Value(string value)
        {
            item.Value = value;

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
        /// Define when the item will be checked on intial render.
        /// </summary>
        /// <param name="value">If true the item will be checked.</param>
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
        ///                 .Checked(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder Checked(bool value)
        {
            item.Checked = value;

            return this;
        }

        /// <summary>
        /// Enables/disables the rendering of a checkbox for this item.
        /// </summary>
        /// <param name="value">If false, no checkbox will be rendered.</param>
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
        ///                 .Checkable(false);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder Checkable(bool value)
        {
            item.Checkable = value;

            return this;
        }

        /// <summary>
        /// Sets the expand mode of the treeview item.
        /// </summary>
        /// <param name="value">If true then item will be load on demand from client side.</param>
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
        ///                 .LoadOnDemand(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewItemBuilder LoadOnDemand(bool value)
        {
            item.LoadOnDemand = value;

            return this;
        }
    }
}