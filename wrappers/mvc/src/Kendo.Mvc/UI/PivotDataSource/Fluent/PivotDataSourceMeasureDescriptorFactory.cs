namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="PivotDataSourceMeasureDescriptor" />.
    /// </summary>
    public class PivotDataSourceMeasureDescriptorFactory : IHideObjectMembers
    {
        private readonly IList<PivotDataSourceMeasureDescriptor> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureValuesFactory"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public PivotDataSourceMeasureDescriptorFactory(IList<PivotDataSourceMeasureDescriptor> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public PivotDataSourceMeasureDescriptorBuilder Add()
        {
            PivotDataSourceMeasureDescriptor item = new PivotDataSourceMeasureDescriptor();

            container.Add(item);

            return new PivotDataSourceMeasureDescriptorBuilder(item);
        }
    }
}
