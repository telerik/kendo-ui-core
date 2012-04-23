// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    public class FirstFunction : EnumerableAggregateFunction
    {
        /// <summary>
        /// Gets the the First method name.
        /// </summary>
        /// <value><c>First</c>.</value>
        public override string AggregateMethodName
        {
            get
            {
                return "FirstOrDefault";
            }
        }
    }
}