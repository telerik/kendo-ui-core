namespace Kendo.Mvc.UI.Fluent
{
    public class GridToolBarCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarCommandBase<T>, GridToolBarCommandBuilder<T>> where T : class
    {
        public GridToolBarCommandBuilder(GridToolBarCommandBase<T> command)
            : base(command)
        {
        }
    }
}