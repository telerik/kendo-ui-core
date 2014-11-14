using System.Collections;
using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public class TreeDataSourceResult
    {
        public IEnumerable Data { get; set; }
        public IEnumerable<TreeAggreateResult> AggregateResults { get; set; }
        public object Errors { get; set; }
    }

    public class TreeAggreateResult
    {
        public object Key
        {
            get;
            set;
        }

        public IEnumerable<AggregateResult> AggregateResults 
        { 
            get; 
            set; 
        }
    }
}
