namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSourceColumn"/>.
    /// </summary>
    public class PivotGridDataSourceColumnBuilder : IHideObjectMembers
    {
        private readonly PivotGridDataSourceColumn column;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridDataSourceColumnBuilder"/> class.
        /// </summary>
        /// <param name="column">The column</param>
        public PivotGridDataSourceColumnBuilder(PivotGridDataSourceColumn column)
        {
            this.column = column;
        }

        /// <summary>
        /// Sets the expanded state of the column.
        /// </summary>
        /// <param name="isExpanded">Expanded state</param>
        public PivotGridDataSourceColumnBuilder Expand(bool isExpanded)
        {
            column.Expand = isExpanded;

            return this;
        }
    }
}
