// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Collections.ObjectModel;
    using System.Linq;

    public class AggregateResultCollection : Collection<AggregateResult>
    {
        /// <summary>
        /// Gets the first <see cref="AggregateResult"/> which
        /// <see cref="AggregateResult.FunctionName"/> is equal to <paramref name="functionName"/>.
        /// </summary>
        /// <value>
        /// The <see cref="AggregateResult"/> for the specified function if any, otherwise null.
        /// </value>
        public AggregateResult this[string functionName]
        {
            get
            {
                return this.FirstOrDefault(r => r.FunctionName == functionName);
            }
        }
    }
}