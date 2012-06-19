using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI.Fluent
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

        /// <summary>
        /// Defines a edit command.
        /// </summary>
        /// <returns></returns>
        public GridEditActionCommandBuilder Edit()
        {
            GridEditActionCommand command = new GridEditActionCommand();
            
            Column.Commands.Add(command);

            Column.Grid.Editable.Enabled = true;

            return new GridEditActionCommandBuilder(command);
        }

        /// <summary>
        /// Defines a delete command.
        /// </summary>
        /// <returns></returns>
        public GridDestroyActionCommandBuilder Destroy()
        {
            GridDestroyActionCommand command = new GridDestroyActionCommand();

            Column.Commands.Add(command);

            Column.Grid.Editable.Enabled = true;

            return new GridDestroyActionCommandBuilder(command);
        }

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
            var command = new GridCustomActionCommand<T>();
            command.Name = name;

            Column.Commands.Add(command);

            return new GridCustomActionCommandBuilder<T>(command);
        }
    }
}