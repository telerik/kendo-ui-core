namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring filter operator.
    /// </summary>    
    public abstract class DataSourceFilterComparisonDescriptorBuilderBase<TValue, TCompositeBuilder> : DataSourceFilterEqualityDescriptorBuilderBase<TValue, TCompositeBuilder> where TCompositeBuilder : DataSourceFilterCompositeBuilderBase
    {
        protected DataSourceFilterComparisonDescriptorBuilderBase(CompositeFilterDescriptor descriptor) : base(descriptor)
        {
        }
        
        /// <summary>
        /// Includes only values which are less then the given value.
        /// </summary>                
        /// <param name="value">The value which the result should be less then</param>        
        public TCompositeBuilder IsLessThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThan, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which are less or equal to the given value.        
        /// </summary>
        /// <param name="value">The value which the result should be less or equal to</param>        
        public TCompositeBuilder IsLessThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsLessThanOrEqualTo, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which are greater then or equal to the given value.        
        /// </summary>
        /// <param name="value">The value which the result should be greater then or equal to</param>
        public TCompositeBuilder IsGreaterThanOrEqualTo(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThanOrEqualTo, value);

            return CreateBuilder();
        }

        /// <summary>
        /// Includes only values which are greater then the given value.        
        /// </summary>
        /// <param name="value">The value which the result should be greater then</param>
        public TCompositeBuilder IsGreaterThan(TValue value)
        {
            SetOperatorAndValue(FilterOperator.IsGreaterThan, value);

            return CreateBuilder();
        }
    }
}