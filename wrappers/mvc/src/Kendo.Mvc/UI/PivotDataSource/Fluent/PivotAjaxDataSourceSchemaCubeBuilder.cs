namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceSchemaCube"/> component.
    /// </summary>
    public class PivotAjaxDataSourceSchemaCubeBuilder<TModel>
        where TModel : class
    {
        protected readonly PivotDataSourceSchemaCube cube;

        public PivotAjaxDataSourceSchemaCubeBuilder(PivotDataSourceSchemaCube cube)
        {
            this.cube = cube;
        }

        /// <summary>
        /// Sets the dimensions option of the pivotGrid dataSource. 
        /// </summary>
        /// <param name="configurator">The lambda which configures the cube dimensions</param>
        public PivotAjaxDataSourceSchemaCubeBuilder<TModel> Dimensions(Action<PivotAjaxDataSourceSchemaCubeDimensionFactory<TModel>> configurator)
        {
            configurator(new PivotAjaxDataSourceSchemaCubeDimensionFactory<TModel>(cube.Dimensions));

            return this;
        }

        /// <summary>
        /// Sets the measures option of the pivotGrid dataSource. 
        /// </summary>
        /// <param name="configurator">The lambda which configures the cube measures</param>
        public PivotAjaxDataSourceSchemaCubeBuilder<TModel> Measures(Action<PivotAjaxDataSourceSchemaCubeMeasureFactory<TModel>> configurator)
        {
            configurator(new PivotAjaxDataSourceSchemaCubeMeasureFactory<TModel>(cube.Measures));

            return this;
        }
    }
}
