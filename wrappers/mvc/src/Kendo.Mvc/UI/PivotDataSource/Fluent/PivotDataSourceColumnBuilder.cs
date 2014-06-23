namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceColumn"/>.
    /// </summary>
    public class PivotDataSourceColumnBuilder : IHideObjectMembers
    {
        private readonly PivotDataSourceColumn column;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceColumnBuilder"/> class.
        /// </summary>
        /// <param name="column">The column</param>
        public PivotDataSourceColumnBuilder(PivotDataSourceColumn column)
        {
            this.column = column;
        }

        /// <summary>
        /// Sets the expanded state of the column.
        /// </summary>
        /// <param name="isExpanded">Expanded state</param>
        public PivotDataSourceColumnBuilder Expand(bool isExpanded)
        {
            column.Expand = isExpanded;

            return this;
        }
    }
}
