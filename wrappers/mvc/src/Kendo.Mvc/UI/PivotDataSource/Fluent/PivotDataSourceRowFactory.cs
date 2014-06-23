using System.Collections.Generic;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates rows for the <see cref="PivotDataSource" /> class.
    /// </summary>
    public class PivotDataSourceRowFactory : IHideObjectMembers
    {
         private readonly IList<PivotDataSourceRow> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceRowFactory"/> class.
        /// </summary>
        /// <param name="container">The container</param>
         public PivotDataSourceRowFactory(IList<PivotDataSourceRow> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a PivotGrid row and set it's name.
        /// </summary>
        /// <param name="name">The name</param>
        public PivotDataSourceRowBuilder Add(string name)
        {
            PivotDataSourceRow resource = new PivotDataSourceRow();
            resource.Name = name;
            container.Add(resource);

            return new PivotDataSourceRowBuilder(resource);
        }
    }
}
