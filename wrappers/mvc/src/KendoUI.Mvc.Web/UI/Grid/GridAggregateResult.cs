// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Infrastructure;
    
    public class GridAggregateResult
    {
        private readonly IEnumerable<AggregateResult> aggregateResults;

        public GridAggregateResult(IEnumerable<AggregateResult> aggregateResults)
        {
            this.aggregateResults = aggregateResults;
        }

        public AggregateResult Max
        {
            get
            {
                return aggregateResults.FirstOrDefault(res => res.FunctionName.StartsWith("Max"));
            }
        }

        public AggregateResult Min
        {
            get
            {
                return aggregateResults.FirstOrDefault(res => res.FunctionName.StartsWith("Min"));
            }
        }

        public AggregateResult Count
        {
            get
            {
                return aggregateResults.FirstOrDefault(res => res.FunctionName.StartsWith("Count"));
            }
        }

        public AggregateResult Average
        {
            get
            {
                return aggregateResults.FirstOrDefault(res => res.FunctionName.StartsWith("Average"));
            }
        }

        public AggregateResult Sum
        {
            get
            {
                return aggregateResults.FirstOrDefault(res => res.FunctionName.StartsWith("Sum"));
            }
        }
    }
}