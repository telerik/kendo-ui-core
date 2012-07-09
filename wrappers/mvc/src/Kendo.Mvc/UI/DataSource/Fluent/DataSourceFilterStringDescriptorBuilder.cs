namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring filter string operator.
    /// </summary>  
    public class DataSourceFilterStringDescriptorBuilder : DataSourceFilterEqualityDescriptorBuilderBase<string, DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder>>
    {
        public DataSourceFilterStringDescriptorBuilder(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }

        /// <summary>
        /// Includes only values which are starting with the given string.
        /// </summary>
        /// <param name="value">The string with which the result should start</param>        
        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> StartsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.StartsWith, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which end with the given string.
        /// </summary>
        /// <param name="value">The string with which the result should end</param>
        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> EndsWith(string value)
        {
            SetOperatorAndValue(FilterOperator.EndsWith, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which contain the given string.
        /// </summary>
        /// <param name="value">The string which the result should contain</param>
        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> Contains(string value)
        {
            SetOperatorAndValue(FilterOperator.Contains, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which does not contain the given string.
        /// </summary>
        /// <param name="value">The string which the result should not contain</param>
        public DataSourceFilterCompositeBuilder<DataSourceFilterStringDescriptorBuilder> DoesNotContain(string value)
        {
            SetOperatorAndValue(FilterOperator.DoesNotContain, value);

            return CreateBuilder();
        }
    }
}