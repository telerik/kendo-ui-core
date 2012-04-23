// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="GridActionColumnBuilder"/> component.
    /// </summary>
    public class GridActionColumnBuilder : GridColumnBuilderBase<IGridColumn, GridActionColumnBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridActionColumnBuilder"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridActionColumnBuilder(IGridColumn column) : base(column)
        {
        }
    }
}
