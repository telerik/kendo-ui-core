namespace Kendo.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring delete action command.
    /// </summary>
    /// <typeparam name=""></typeparam>
    public class GridDestroyActionCommandBuilder : GridActionCommandBuilderBase<GridDestroyActionCommand, GridDestroyActionCommandBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridDeleteActionCommandBuilder&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="command">The command.</param>
        public GridDestroyActionCommandBuilder(GridDestroyActionCommand command)
            : base(command)
        {
        }
    }
}
