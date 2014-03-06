namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="Schema"/> options.
    /// </summary>
    public class SignalRHierarchicalDataSourceSchemaBuilder<TModel> : CustomDataSourceSchemaBuilderBase<CustomHierarchicalDataSourceSchemaBuilder<TModel>>
        where TModel : class
    {
        public SignalRHierarchicalDataSourceSchemaBuilder(DataSourceSchema schema)
            : base(schema)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public virtual SignalRHierarchicalDataSourceSchemaBuilder<TModel> Model(Action<SignalRHierarchicalDataSourceModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new SignalRHierarchicalDataSourceModelDescriptorFactory<TModel>(schema.Model));

            return this;
        }
    }
}