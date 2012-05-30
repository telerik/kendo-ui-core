namespace Kendo.Mvc
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