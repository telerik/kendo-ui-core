namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotGridDataSourceRow"/>.
    /// </summary>
    public class PivotGridDataSourceRowBuilder : IHideObjectMembers
    {
        private readonly PivotGridDataSourceRow row;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridDataSourceRowBuilder"/> class.
        /// </summary>
        /// <param name="row">The row</param>
        public PivotGridDataSourceRowBuilder(PivotGridDataSourceRow row)
        {
            this.row = row;
        }

        /// <summary>
        /// Sets the expanded state of the row.
        /// </summary>
        /// <param name="isExpanded">Expanded state</param>
        public PivotGridDataSourceRowBuilder Expand(bool isExpanded)
        {
            row.Expand = isExpanded;

            return this;
        }
    }
}
