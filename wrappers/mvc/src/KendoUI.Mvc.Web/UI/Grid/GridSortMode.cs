// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the sort modes supported by <see cref="Grid{T}"/>
    /// </summary>
    public enum GridSortMode
    {
        /// <summary>
        /// The user can sort only by one column at the same time.
        /// </summary>
        SingleColumn,
        /// <summary>
        /// The user can sort by more than one column at the same time.
        /// </summary>
        MultipleColumn
    }
}