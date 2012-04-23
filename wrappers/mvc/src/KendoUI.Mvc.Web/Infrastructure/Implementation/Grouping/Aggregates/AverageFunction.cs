// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    /// <summary>
    /// Represents a function that returns the arithmetic mean of a set of arguments.
    /// </summary>
    public class AverageFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AverageFunction"/> class.
        /// </summary>
        public AverageFunction()
        {
        }

        /// <summary>
        /// Gets the the Average method name.
        /// </summary>
        /// <value><c>Average</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Average";
            }
        }
    }
}