namespace KendoUI.Mvc.UI.Fluent
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
