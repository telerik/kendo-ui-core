namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="ModelFieldDescriptor"/>.
    /// </summary>                
    public class CustomDataSourceModelFieldDescriptorBuilder<T> : DataSourceModelFieldDescriptorBuilderBase<T, CustomDataSourceModelFieldDescriptorBuilder<T>>
    {
        public CustomDataSourceModelFieldDescriptorBuilder(ModelFieldDescriptor descriptor)
            : base(descriptor)
        {
        }

        /// <summary>
        /// Specifies the field of the original record which value to be used for population of the Model field.
        /// </summary>       
        /// <param name="fromField">The field of the original record which value to be used</param>
        public virtual CustomDataSourceModelFieldDescriptorBuilder<T> From(string fromField)
        {
            descriptor.From = fromField;
            return this;
        }

        /// <summary>
        /// Specifies the handler which will parse the field value. If not set default parsers will be used.
        /// </summary>       
        /// <param name="handler">The handler</param>
        public virtual CustomDataSourceModelFieldDescriptorBuilder<T> Parse(string handler)
        {
            descriptor.Parse.HandlerName = handler;
            return this;
        }

        /// <summary>
        /// Specifies the handler which will parse the field value. If not set default parsers will be used.
        /// </summary>
        public virtual CustomDataSourceModelFieldDescriptorBuilder<T> Parse(Func<object,object> handler)
        {
            descriptor.Parse.TemplateDelegate = handler;
            return this;
        }
    }
}