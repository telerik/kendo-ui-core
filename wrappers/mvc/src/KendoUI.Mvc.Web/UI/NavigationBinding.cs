// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections;

    public class NavigationBinding<TNavigationItem, TParent> : INavigationBinding<TNavigationItem>
        where TParent : class
        where TNavigationItem : NavigationItem<TNavigationItem>
    {
        public Func<TParent, IEnumerable> Children
        {
            get;
            set;
        }

        public Action<TNavigationItem, TParent> ItemDataBound
        {
            get;
            set;
        }

        Type INavigationBinding<TNavigationItem>.Type
        {
            get
            {
                return typeof(TParent);
            }
        }

        IEnumerable INavigationBinding<TNavigationItem>.Children(object parent)
		{
            return Children != null ? Children((TParent)parent) : null;
		}

        void INavigationBinding<TNavigationItem>.ItemDataBound(TNavigationItem item, object value)
        {
            ItemDataBound(item, (TParent)value);
        }
    }

    public interface INavigationBinding<T> where T : NavigationItem<T>
    {
        IEnumerable Children(object parent);
        void ItemDataBound(T item, object value);
        Type Type
        {
            get;
        }
    }
}
