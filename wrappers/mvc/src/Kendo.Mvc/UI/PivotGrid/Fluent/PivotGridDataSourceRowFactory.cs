namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates rows for the <see cref="PivotGridDataSource" /> class.
    /// </summary>
    public class PivotGridDataSourceRowFactory : IHideObjectMembers
    {
         private readonly PivotGridDataSource container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotGridDataSourceRowFactory"/> class.
        /// </summary>
        /// <param name="container">The container</param>
         public PivotGridDataSourceRowFactory(PivotGridDataSource container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a PivotGrid row and set it's name.
        /// </summary>
        /// <param name="name">The name</param>
        public PivotGridDataSourceRowBuilder Add(string name)
        {
            PivotGridDataSourceRow resource = new PivotGridDataSourceRow();
            resource.Name = name;
            container.Rows.Add(resource);

            return new PivotGridDataSourceRowBuilder(resource);
        }
    }
}
