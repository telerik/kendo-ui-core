// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents a category axis
    /// </summary>
    public interface IChartCategoryAxis : IChartAxis
    {
        /// <summary>
        /// The categories displayed on the axis
        /// </summary>
        IEnumerable Categories
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The Model member used to populate the <see cref="Categories" />
        /// </summary>
        string Member
        {
            get;
            set;
        }  
    }
}
