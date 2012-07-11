namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo TreeView for ASP.NET MVC
    /// </summary>
    public class TreeViewItem : NavigationItem<TreeViewItem>, INavigationItemContainer<TreeViewItem>, IHierarchicalItem
    {
        public TreeViewItem()
        {
            this.Items = new LinkedObjectCollection<TreeViewItem>(this);
        }

        public IList<TreeViewItem> Items
        {
            get;
            private set;
        }

        public string Id { get; set; }

        public bool Expanded { get; set; }

        public bool HasChildren { get; set; }
    }
}