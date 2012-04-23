// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;

    using Infrastructure;

    public class PanelBarItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<PanelBarItem> container;
        private readonly ViewContext viewContext;

        public PanelBarItemFactory(INavigationItemContainer<PanelBarItem> container, ViewContext viewContext)
        {
            Guard.IsNotNull(container, "container");
            Guard.IsNotNull(viewContext, "viewContext");

            this.container = container;
            this.viewContext = viewContext;
        }

        public virtual PanelBarItemBuilder Add()
        {
            PanelBarItem item = new PanelBarItem();

            container.Items.Add(item);

            return new PanelBarItemBuilder(item, viewContext);
        }
    }
}