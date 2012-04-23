// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.Collections.Generic;

    using Infrastructure;
    using UI;

    public class GridCommand
    {
        public GridCommand()
        {
            Page = 1;
            PageSize = 10;

            SortDescriptors = new List<SortDescriptor>();
            FilterDescriptors = new List<IFilterDescriptor>();
            GroupDescriptors = new List<GroupDescriptor>();
            Aggregates = new List<AggregateDescriptor>();
        }

        public int Page
        {
            get;
            set;
        }

        public int PageSize
        {
            get;
            set;
        }

        public IList<SortDescriptor> SortDescriptors
        {
            get;
            private set;
        }

        public IList<IFilterDescriptor> FilterDescriptors
        {
            get;
            private set;
        }

        public IList<GroupDescriptor> GroupDescriptors
        {
            get;
            private set;
        }

        public IList<AggregateDescriptor> Aggregates
        {
            get;
            private set;
        }

        public static GridCommand Parse(int page, int pageSize, string orderBy, string groupBy, string filter)
        {
            GridCommand result = new GridCommand
            {
                Page = page,
                PageSize = pageSize,
                SortDescriptors = GridDescriptorSerializer.Deserialize<SortDescriptor>(orderBy),
                FilterDescriptors = FilterDescriptorFactory.Create(filter),
                GroupDescriptors = GridDescriptorSerializer.Deserialize<GroupDescriptor>(groupBy)
            };

            return result;
        }
    }
}