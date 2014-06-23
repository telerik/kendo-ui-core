using System.Collections.Generic;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates columns for the <see cref="PivotDataSource" /> class.
    /// </summary>
    public class PivotDataSourceColumnFactory : IHideObjectMembers
    {
        private readonly  IList<PivotDataSourceColumn> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceColumnFactory"/> class.
        /// </summary>
        /// <param name="container">The container</param>
        public PivotDataSourceColumnFactory(IList<PivotDataSourceColumn> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a PivotGrid column and set it's name.
        /// </summary>
        /// <param name="name">The name</param>
        public PivotDataSourceColumnBuilder Add(string name)
        {
            PivotDataSourceColumn resource = new PivotDataSourceColumn();
            resource.Name = name;
            container.Add(resource);

            return new PivotDataSourceColumnBuilder(resource);
        }
    }
}
