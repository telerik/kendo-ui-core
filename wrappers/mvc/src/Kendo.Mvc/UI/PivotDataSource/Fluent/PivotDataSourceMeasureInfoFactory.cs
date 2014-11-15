namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using Infrastructure;

    /// <summary>
    /// Creates items for the <see cref="PivotDataSourceMeasureInfo" />.
    /// </summary>
    public class PivotDataSourceMeasureInfoFactory : IHideObjectMembers
    {
        private readonly IList<PivotDataSourceMeasureInfo> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="PivotDataSourceMeasureValuesFactory"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public PivotDataSourceMeasureInfoFactory(IList<PivotDataSourceMeasureInfo> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public PivotDataSourceMeasureInfoBuilder Add()
        {
            PivotDataSourceMeasureInfo item = new PivotDataSourceMeasureInfo();

            container.Add(item);

            return new PivotDataSourceMeasureInfoBuilder(item);
        }
    }
}
