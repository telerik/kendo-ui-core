// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using Infrastructure;

    public interface INavigationHtmlBuilder<TComponent, TItem>
        where TComponent : ViewComponentBase, INavigationItemContainer<TItem>
        where TItem:NavigationItem<TItem>
    {
        TComponent Component
        {
            get;
        }

        IActionMethodCache ActionMethodCache
        {
            get;
        }
    }
}
