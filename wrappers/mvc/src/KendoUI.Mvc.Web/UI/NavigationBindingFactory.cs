// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public class NavigationBindingFactory<TNavigationItem> 
        where TNavigationItem : NavigationItem<TNavigationItem>
    {
        internal readonly IList<INavigationBinding<TNavigationItem>> container;

        public NavigationBindingFactory()
        {
            this.container = new List<INavigationBinding<TNavigationItem>>();
        }

        public NavigationBindingFactory<TNavigationItem> For<TParent>(Action<NavigationBindingBuilder<TNavigationItem, TParent>> action) 
            where TParent : class
        {
            NavigationBinding<TNavigationItem, TParent> item = new NavigationBinding<TNavigationItem, TParent>();
            NavigationBindingBuilder<TNavigationItem, TParent> builder = new NavigationBindingBuilder<TNavigationItem, TParent>(item);

            container.Add(item);

            action(builder);

            return this;
        }
    }
}
