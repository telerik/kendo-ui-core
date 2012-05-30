namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    public class GridGroupAggregateResult : GridAggregateResult
    {

        public GridGroupAggregateResult(string title, object key, IEnumerable<AggregateResult> aggregateResults)
            : base(aggregateResults)
        {
            Key = key;
            Title = title;
        }

        public string Title
        {
            get;
            private set;
        }
        
        public object Key
        {
            get;
            private set;
        }
    }
}
