namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="ModelFieldDescriptor"/>.
    /// </summary>                
    public class DataSourceModelFieldDescriptorBuilder<T>        
    {
        private readonly ModelFieldDescriptor descriptor;

        public DataSourceModelFieldDescriptorBuilder(ModelFieldDescriptor descriptor)
        {
            this.descriptor = descriptor;
        }

        /// <summary>
        /// Sets the value which will be used to populate the field when new non-existing model is created.
        /// </summary>
        /// <param name="value">The value</param>        
        public virtual DataSourceModelFieldDescriptorBuilder<T> DefaultValue(T value)
        {
            descriptor.DefaultValue = value;
            return this;
        }

        /// <summary>
        /// Specifies if the field should be editable.
        /// </summary>        
        public virtual DataSourceModelFieldDescriptorBuilder<T> Editable()
        {
            descriptor.IsEditable = true;
            return this;
        }

        /// <summary>
        /// Specifies if the field should be editable.
        /// </summary>
        /// <param name="enabled">True is the field should be editable, otherwise false</param>        
        public virtual DataSourceModelFieldDescriptorBuilder<T> Editable(bool enabled)
        {
            descriptor.IsEditable = enabled;
            return this;
        }
    }
}
