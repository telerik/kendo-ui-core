// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.ComponentModel;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;
    /// <summary>
    /// Represents declarative sorting.
    /// </summary>
    public class SortDescriptor : IDescriptor
    {
        /// <summary>
        /// Gets or sets the member name which will be used for sorting.
        /// </summary>
        /// <filterValue>The member that will be used for sorting.</filterValue>
        public string Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the sort direction for this sort descriptor. If the value is null
        /// no sorting will be applied.
        /// </summary>
        /// <value>The sort direction. The default value is null.</value>
        public ListSortDirection SortDirection
        {
            get;
            set;
        }

        public void Deserialize(string source)
        {
            var parts = source.Split(new [] { '-' });
            
            if (parts.Length > 1)
            {
                Member = parts[0];
            }

            var sortDirection = parts.Last();
            
            SortDirection = sortDirection == "desc" ? ListSortDirection.Descending : ListSortDirection.Ascending;
        }
        
        public string Serialize()
        {
            return "{0}-{1}".FormatWith(Member, SortDirection == ListSortDirection.Ascending ? "asc" : "desc");
        }
    }
}
