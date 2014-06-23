namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceRow"/>.
    /// </summary>
    public class PivotDataSourceRowBuilder : IHideObjectMembers
    {
        private readonly PivotDataSourceRow row;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceRowBuilder"/> class.
        /// </summary>
        /// <param name="row">The row</param>
        public PivotDataSourceRowBuilder(PivotDataSourceRow row)
        {
            this.row = row;
        }

        /// <summary>
        /// Sets the expanded state of the row.
        /// </summary>
        /// <param name="isExpanded">Expanded state</param>
        public PivotDataSourceRowBuilder Expand(bool isExpanded)
        {
            row.Expand = isExpanded;

            return this;
        }
    }
}
