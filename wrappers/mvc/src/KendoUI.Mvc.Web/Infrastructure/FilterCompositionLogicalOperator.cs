// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc
{
    /// <summary>
    /// Logical operator used for filter descriptor composition.
    /// </summary>
    public enum FilterCompositionLogicalOperator
    {
        /// <summary>
        /// Combines filters with logical AND.
        /// </summary>
        And,

        /// <summary>
        /// Combines filters with logical OR.
        /// </summary>
        Or
    }
}