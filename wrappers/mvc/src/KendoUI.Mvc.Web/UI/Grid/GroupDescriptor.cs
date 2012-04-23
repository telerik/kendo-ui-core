// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.ComponentModel;
	
    using Infrastructure.Implementation;
    
    /// <summary>
    /// Represents grouping criteria.
    /// </summary>
    public class GroupDescriptor : SortDescriptor
    {
        private object displayContent;
        private AggregateFunctionCollection aggregateFunctions;

        /// <summary>
        /// Gets or sets the type of the member that is used for grouping.
        /// Set this property if the member type cannot be resolved automatically.
        /// Such cases are: items with ICustomTypeDescriptor, XmlNode or DataRow.
        /// Changing this property did not raise 
        /// <see cref="PropertyChanged"/> event.
        /// </summary>
        /// <value>The type of the member used for grouping.</value>
        public Type MemberType { get; set; }

        /// <summary>
        /// Gets or sets the content which will be used from UI.
        /// </summary>
        /// <filterValue>The content that will be used from UI.</filterValue>
        public object DisplayContent
        {
            get
            {
                if (this.displayContent == null)
                {
                    return this.Member;
                }

                return this.displayContent;
            }
            set
            {
                this.displayContent = value;
            }
        }

        /// <summary>
        /// Gets or sets the aggregate functions used when grouping is executed.
        /// </summary>
        /// <value>The aggregate functions that will be used in grouping.</value>
        public AggregateFunctionCollection AggregateFunctions
        {
            get
            {
                return aggregateFunctions = aggregateFunctions ?? new AggregateFunctionCollection();
            }
        }

        /// <summary>
        /// Changes the <see cref="SortDescriptor"/> to the next logical value.
        /// </summary>
        public void CycleSortDirection()
        {
            this.SortDirection = GetNextSortDirection(this.SortDirection);
        }

        private static ListSortDirection GetNextSortDirection(ListSortDirection? sortDirection)
        {
            switch (sortDirection)
            {
                case ListSortDirection.Ascending:
                    return ListSortDirection.Descending;
                default:
                    return ListSortDirection.Ascending;
            }
        }
    }
}
