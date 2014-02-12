namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="ModelFieldDescriptor"/>.
    /// </summary>                
    public abstract class DataSourceModelFieldDescriptorBuilderBase<T, TDataSourceModelFieldDescriptorBuilder>
        where TDataSourceModelFieldDescriptorBuilder : DataSourceModelFieldDescriptorBuilderBase<T, TDataSourceModelFieldDescriptorBuilder>
    {
        protected readonly ModelFieldDescriptor descriptor;

        public DataSourceModelFieldDescriptorBuilderBase(ModelFieldDescriptor descriptor)
        {
            this.descriptor = descriptor;
        }

        /// <summary>
        /// Sets the value which will be used to populate the field when new non-existing model is created.
        /// </summary>
        /// <param name="value">The value</param>        
        public virtual TDataSourceModelFieldDescriptorBuilder DefaultValue(T value)
        {
            descriptor.DefaultValue = value;
            return (TDataSourceModelFieldDescriptorBuilder)this;
        }

        /// <summary>
        /// Sets the value which will be used to populate the field when new non-existing model is created.
        /// </summary>
        /// <param name="value">The value</param>
        public virtual TDataSourceModelFieldDescriptorBuilder DefaultValue(object value)
        {
            descriptor.DefaultValue = value;
            return (TDataSourceModelFieldDescriptorBuilder)this;
        }

        /// <summary>
        /// Specifies if the field should be editable.
        /// </summary>        
        public virtual TDataSourceModelFieldDescriptorBuilder Editable()
        {
            descriptor.IsEditable = true;
            return (TDataSourceModelFieldDescriptorBuilder)this;
        }

        /// <summary>
        /// Specifies if the field should be editable.
        /// </summary>
        /// <param name="enabled">True is the field should be editable, otherwise false</param>        
        public virtual TDataSourceModelFieldDescriptorBuilder Editable(bool enabled)
        {
            descriptor.IsEditable = enabled;
            return (TDataSourceModelFieldDescriptorBuilder)this;
        }
    }
}
