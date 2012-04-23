// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
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
            Guard.IsNotNull(container, "container");
            Guard.IsNotNull(viewContext, "viewContext");

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