// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the position of pie chart labels.
    /// </summary>
    public enum ChartPieLabelsPosition
    {
        /// <summary>
        /// The label is positioned at the center of the pie segment.
        /// </summary>
        Center,

        /// <summary>
        /// The label is positioned inside, near the end of the pie segment.
        /// </summary>
        InsideEnd,

        /// <summary>
        /// The label is positioned outside, near the end of the pie segment.
        /// The label and the pie segment are connected with connector line.
        /// </summary>
        OutsideEnd
    }
}