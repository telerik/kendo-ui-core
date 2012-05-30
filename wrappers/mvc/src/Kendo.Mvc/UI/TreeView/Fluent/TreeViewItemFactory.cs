namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="TreeView" />.
    /// </summary>
    public class TreeViewItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<TreeViewItem> container;
        private readonly ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewItemFactory"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public TreeViewItemFactory(INavigationItemContainer<TreeViewItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public TreeViewItemBuilder Add()
        {
            TreeViewItem item = new TreeViewItem();

            container.Items.Add(item);

            return new TreeViewItemBuilder(item, viewContext);
        }
    }
}