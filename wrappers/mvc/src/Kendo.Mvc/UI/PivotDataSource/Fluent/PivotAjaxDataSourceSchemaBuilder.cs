namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceSchema"/> component.
    /// </summary>
    public class PivotAjaxDataSourceSchemaBuilder<TModel>
        where TModel : class
    {
        protected readonly PivotDataSourceSchema schema;

        public PivotAjaxDataSourceSchemaBuilder(PivotDataSourceSchema schema)
        {
            this.schema = schema;
        }

        /// <summary>
        /// Configures the cube
        /// </summary>
        public PivotAjaxDataSourceSchemaBuilder<TModel> Cube(Action<PivotAjaxDataSourceSchemaCubeBuilder<TModel>> configurator)
        {
            configurator(new PivotAjaxDataSourceSchemaCubeBuilder<TModel>(schema.Cube));

            return this;
        }
    }
}
