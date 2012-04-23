// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

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
