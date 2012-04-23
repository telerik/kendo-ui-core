// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents Chart series bound to data.
    /// </summary>
    public interface IChartBoundSeries : IChartSeries
    {
        /// <summary>
        /// Gets the data member of the series.
        /// </summary>
        string Member
        {
            get;
            set;
        }

        /// <summary>
        /// The data used for binding.
        /// </summary>
        IEnumerable Data
        {
            get;
            set;
        }
    }
}
