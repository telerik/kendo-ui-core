// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public class MenuItem : NavigationItem<MenuItem>, INavigationItemContainer<MenuItem>
    {
        public MenuItem()
        {
            Items = new LinkedObjectCollection<MenuItem>(this);
        }

        public IList<MenuItem> Items
        {
            get;
            private set;
        }
    }
}