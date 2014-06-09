namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates columns for the <see cref="PivotGridDataSource" /> class.
    /// </summary>
    public class PivotGridDataSourceColumnFactory : IHideObjectMembers
    {
        private readonly PivotGridDataSource container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridDataSourceColumnFactory"/> class.
        /// </summary>
        /// <param name="container">The container</param>
        public PivotGridDataSourceColumnFactory(PivotGridDataSource container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a PivotGrid column and set it's name.
        /// </summary>
        /// <param name="name">The name</param>
        public PivotGridDataSourceColumnBuilder Add(string name)
        {
            PivotGridDataSourceColumn resource = new PivotGridDataSourceColumn();
            resource.Name = name;
            container.Columns.Add(resource);

            return new PivotGridDataSourceColumnBuilder(resource);
        }
    }
}
