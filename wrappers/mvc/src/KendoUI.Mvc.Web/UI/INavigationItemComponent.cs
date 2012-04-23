// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    
    using Infrastructure;

    public interface INavigationItemComponent<TItem> : INavigationItemContainer<TItem>
        where TItem: NavigationItem<TItem>
    {
        IUrlGenerator UrlGenerator
        {
            get;
        }

        ViewContext ViewContext
        {
            get;
        }

        Action<TItem> ItemAction
        {
            get;
            set;
        }

        INavigationItemAuthorization Authorization
        {
            get;
        }

        bool SecurityTrimming
        {
            get;
            set;
        }
    }
}
