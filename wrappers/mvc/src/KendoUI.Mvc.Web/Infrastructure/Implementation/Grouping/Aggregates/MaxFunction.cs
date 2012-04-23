// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    /// <summary>
    /// Represents a function that returns the greatest item from a set of items.
    /// </summary>
    public class MaxFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MaxFunction"/> class.
        /// </summary>
        public MaxFunction()
        {
        }

        /// <summary>
        /// Gets the the Max method name.
        /// </summary>
        /// <value><c>Max</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Max";
            }
        }
    }
}