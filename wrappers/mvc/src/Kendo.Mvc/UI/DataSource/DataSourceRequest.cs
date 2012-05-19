using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequest
    {
        public DataSourceRequest()
        {
            Page = 1;
           // PageSize = 10;
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

        public IList<SortDescriptor> Sorts
        {
            get;
            set;
        }

        public IList<IFilterDescriptor> Filters
        {
            get;
            set;
        }

        public IList<GroupDescriptor> Groups
        {
            get;
            set;
        }

        public IList<AggregateDescriptor> Aggregates
        {
            get;
            set;
        }

    }
}
