// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

    static class GridColumnExtensions
    {
        public static string GroupTitleForMember(this IEnumerable<IGridColumn> columns, string memberName)
        {
            var column = columns.OfType<IGridBoundColumn>().FirstOrDefault(c => c.Member == memberName);
            if (column != null)
            {
                return !column.Title.HasValue() ? column.Member.AsTitle() : column.Title;
            }

            return memberName.AsTitle();
        }
    }
}