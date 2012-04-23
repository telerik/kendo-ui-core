// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring delete action command.
    /// </summary>
    /// <typeparam name=""></typeparam>
    public class GridDeleteActionCommandBuilder : GridActionCommandBuilderBase<GridDeleteActionCommand, GridDeleteActionCommandBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridDeleteActionCommandBuilder&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="command">The command.</param>
        public GridDeleteActionCommandBuilder(GridDeleteActionCommand command)
            : base(command)
        {
        }
    }
}
