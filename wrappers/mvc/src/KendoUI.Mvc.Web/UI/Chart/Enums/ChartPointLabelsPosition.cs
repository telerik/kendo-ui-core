// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
using System;

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the position of point labels.
    /// </summary>
    public enum ChartPointLabelsPosition
    {
        /// <summary>
        /// The label is positioned at the top of the point marker.
        /// </summary>
        Above,

        /// <summary>
        /// The label is positioned at the right of the point marker.
        /// </summary>
        Right,

        /// <summary>
        /// The label is positioned at the bottom of the point marker.
        /// </summary>
        Below,

        /// <summary>
        /// The label is positioned at the left of the point marker.
        /// </summary>
        Left
    }

    /// <summary>
    /// Defines the position of line chart labels.
    /// </summary>
    [Obsolete("This enumeration is obsolete. Use ChartPointLabelsPosition instead.")]
    public enum ChartLineLabelsPosition
    {
        /// <summary>
        /// The label is positioned at the top of the line chart marker.
        /// </summary>
        Above,

        /// <summary>
        /// The label is positioned at the right of the line chart marker.
        /// </summary>
        Right,

        /// <summary>
        /// The label is positioned at the bottom of the line chart marker.
        /// </summary>
        Below,

        /// <summary>
        /// The label is positioned at the left of the line chart marker.
        /// </summary>
        Left
    }
}