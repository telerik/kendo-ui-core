// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    /// <summary>
    /// Represents a function that returns the least item from a set of items.
    /// </summary>
    public class MinFunction : EnumerableSelectorAggregateFunction
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MinFunction"/> class.
        /// </summary>
        public MinFunction()
        {
        }

        /// <summary>
        /// Gets the the Min method name.
        /// </summary>
        /// <value><c>Min</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "Min";
            }
        }
    }
}