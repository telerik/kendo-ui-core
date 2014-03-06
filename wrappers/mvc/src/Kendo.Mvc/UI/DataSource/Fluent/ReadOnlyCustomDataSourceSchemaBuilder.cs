namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="Schema"/> options.
    /// </summary>
    public class ReadOnlyCustomDataSourceSchemaBuilder<TModel> : CustomDataSourceSchemaBuilderBase<ReadOnlyCustomDataSourceSchemaBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public ReadOnlyCustomDataSourceSchemaBuilder(DataSourceSchema schema)
            : base(schema)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public virtual ReadOnlyCustomDataSourceSchemaBuilder<TModel> Model(Action<ReadOnlyCustomDataSourceModelDescriptorFactory<TModel>> configurator)
        {
            schema.Model = new ModelDescriptor(typeof(TModel));

            configurator(new ReadOnlyCustomDataSourceModelDescriptorFactory<TModel>(schema.Model));

            return this;
        }
    }
}
