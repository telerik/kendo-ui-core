// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
using Telerik.Web.Mvc.Infrastructure;

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates command for the <see cref="Grid{T}" />.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class GridActionCommandFactory<T> : IHideObjectMembers where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridActionCommandFactory&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridActionCommandFactory(GridActionColumn<T> column)
        {
            Column = column;
        }
        
        private GridActionColumn<T> Column
        {
            get;
            set;
        }

#if MVC2 || MVC3
        /// <summary>
        /// Defines a edit command.
        /// </summary>
        /// <returns></returns>
        public GridEditActionCommandBuilder Edit()
        {
            GridEditActionCommand command = new GridEditActionCommand();
            
            Column.Commands.Add(command);

            Column.Grid.Editing.Enabled = true;

            return new GridEditActionCommandBuilder(command);
        }

        /// <summary>
        /// Defines a delete command.
        /// </summary>
        /// <returns></returns>
        public GridDeleteActionCommandBuilder Delete()
        {
            GridDeleteActionCommand command = new GridDeleteActionCommand();

            Column.Commands.Add(command);

            Column.Grid.Editing.Enabled = true;

            return new GridDeleteActionCommandBuilder(command);
        }
#endif
        /// <summary>
        /// Defines a select command.
        /// </summary>
        /// <returns></returns>
        public GridSelectActionCommandBuilder Select()
        {
            GridSelectActionCommand command = new GridSelectActionCommand();

            Column.Commands.Add(command);

            return new GridSelectActionCommandBuilder(command);
        }

        /// <summary>
        /// Defines a custom command.
        /// </summary>
        /// <returns></returns>
        public GridCustomActionCommandBuilder<T> Custom(string name)
        {
            Guard.IsNotNullOrEmpty(name, "name");

            var command = new GridCustomActionCommand<T>();
            command.Name = name;

            Column.Commands.Add(command);

            return new GridCustomActionCommandBuilder<T>(command);
        }
    }
}