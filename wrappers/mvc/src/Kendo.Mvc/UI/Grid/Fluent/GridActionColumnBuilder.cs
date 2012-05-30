namespace Kendo.Mvc.UI.Fluent
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
