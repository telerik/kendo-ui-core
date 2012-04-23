// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Collections.ObjectModel;
    using System.Linq;
    /// <summary>
    /// Represents a collection of <see cref="AggregateFunction"/> items.
    /// </summary>
    public class AggregateFunctionCollection : Collection<AggregateFunction>
    {
        /// <summary>
        /// Gets the <see cref="AggregateFunction"/> with the specified function name.
        /// </summary>
        /// <value>
        /// First <see cref="AggregateFunction"/> with the specified function name 
        /// if any, otherwise null.
        /// </value>
        public AggregateFunction this[string functionName]
        {
            get
            {
                return this.FirstOrDefault(f => f.FunctionName == functionName);
            }
        }
    }
}