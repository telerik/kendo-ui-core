// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>Specifies the location of tick marks in a component.</summary>
    public enum SliderTickPlacement
    {
        /// <summary>No tick marks appear in the component.</summary>
        [ClientSideEnumValue("'none'")]
        None = 0,

        /// <summary>
        /// Tick marks are located on the top of a horizontal component or on the
        /// left of a vertical component.
        /// </summary>
        [ClientSideEnumValue("'topLeft'")]
        TopLeft = 1,

        /// <summary>
        /// Tick marks are located on the bottom of a horizontal component or on the
        /// right side of a vertical component.
        /// </summary>
        [ClientSideEnumValue("'bottomRight'")]
        BottomRight = 2,

        /// <summary>Tick marks are located on both sides of the component.</summary>
        [ClientSideEnumValue("'both'")]
        Both = 3
    }
}