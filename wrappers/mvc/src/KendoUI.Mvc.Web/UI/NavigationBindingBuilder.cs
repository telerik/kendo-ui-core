// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections;

    public class NavigationBindingBuilder<TNavigationItem, TParent> 
        where TNavigationItem : NavigationItem<TNavigationItem>
        where TParent : class
    {
        private NavigationBinding<TNavigationItem, TParent> item;

        public NavigationBindingBuilder(NavigationBinding<TNavigationItem, TParent> item)
        {
            this.item = item;
        }

        public NavigationBindingBuilder<TNavigationItem, TParent> Children(Func<TParent, IEnumerable> children) 
        {
            item.Children = children;

            return this;
        }

        public NavigationBindingBuilder<TNavigationItem, TParent> ItemDataBound(Action<TNavigationItem, TParent> itemDataBound) 
        {
            item.ItemDataBound = itemDataBound;

            return this;
        }
    }
}
