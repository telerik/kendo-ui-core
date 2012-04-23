// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Specifies the expand mode in which the panelbar will expand its items
    /// </summary>
    public enum PanelBarExpandMode
    {
        /// <summary>
        /// Only one item can be expanded.
        /// </summary>
        [ClientSideEnumValue("'single'")]
        Single,

        /// <summary>
        /// All items can be expanded
        /// </summary>
        [ClientSideEnumValue("'multiple'")]
        Multiple
    }
}