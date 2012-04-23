// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System.ComponentModel;
    
    public static class ListSortDirectionExtensions
    {
        public static ListSortDirection? Next(this ListSortDirection? direction)
        {
            if (direction == ListSortDirection.Ascending)
            {
                return ListSortDirection.Descending;
            }

            if (direction == ListSortDirection.Descending)
            {
                return null;
            }

            return ListSortDirection.Ascending;
        }
    }
}
