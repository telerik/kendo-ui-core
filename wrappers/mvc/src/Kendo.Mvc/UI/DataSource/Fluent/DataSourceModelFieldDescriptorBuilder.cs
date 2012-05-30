namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public class DataSourceModelFieldDescriptorBuilder<T>        
    {
        private readonly ModelFieldDescriptor descriptor;

        public DataSourceModelFieldDescriptorBuilder(ModelFieldDescriptor descriptor)
        {
            this.descriptor = descriptor;
        }

        public virtual DataSourceModelFieldDescriptorBuilder<T> DefaultValue(T value)
        {
            descriptor.DefaultValue = value;
            return this;
        }

        public virtual DataSourceModelFieldDescriptorBuilder<T> Editable()
        {
            descriptor.IsEditable = true;
            return this;
        }

        public virtual DataSourceModelFieldDescriptorBuilder<T> Editable(bool enabled)
        {
            descriptor.IsEditable = enabled;
            return this;
        }
    }
}
