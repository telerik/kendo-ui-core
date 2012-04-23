// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines which objects can have child items.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface INavigationItemContainer<T> where T : NavigationItem<T>
    {
        /// <summary>
        /// Child items collection.
        /// </summary>
        IList<T> Items
        {
            get;
        }
    }
}