namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="Schema"/> options.
    /// </summary>
    public class CustomDataSourceSchemaBuilder<TModel> : CustomDataSourceSchemaBuilderBase<CustomDataSourceSchemaBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public CustomDataSourceSchemaBuilder(DataSourceSchema schema)
            : base(schema)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public virtual CustomDataSourceSchemaBuilder<TModel> Model(Action<CustomDataSourceModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new CustomDataSourceModelDescriptorFactory<TModel>(schema.Model));

            return this;
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public virtual CustomDataSourceSchemaBuilder<TModel> Model(object settings)
        {
            schema.FunctionModel = settings;

            return this;
        }
    }
}
