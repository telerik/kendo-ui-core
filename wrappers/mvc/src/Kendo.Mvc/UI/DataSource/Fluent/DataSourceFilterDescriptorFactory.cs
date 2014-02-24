namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring filter.
    /// </summary>    
    public class DataSourceFilterDescriptorFactory<TModel> : DataSourceFilterDescriptorFactoryBase, IHideObjectMembers where TModel : class
    {
        public DataSourceFilterDescriptorFactory(IList<IFilterDescriptor> filters)
            :base(filters)
        {
        }

        /// <summary>
        /// Specifies the member on which the filter should be applied.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>        
        public virtual DataSourceFilterEqualityDescriptorBuilder<bool> Add(Expression<Func<TModel, bool>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterEqualityDescriptorBuilder<bool>(filter);
        }

        /// <summary>
        /// Specifies the member on which the filter should be applied.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>
        public virtual DataSourceFilterEqualityDescriptorBuilder<bool?> Add(Expression<Func<TModel, bool?>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterEqualityDescriptorBuilder<bool?>(filter);
        }

        /// <summary>
        /// Specifies the member on which the filter should be applied.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>        
        public virtual DataSourceFilterComparisonDescriptorBuilder<TValue> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterComparisonDescriptorBuilder<TValue>(filter);
        }

        /// <summary>
        /// Specifies the member on which the filter should be applied.
        /// </summary>
        /// <param name="expression">Member access expression which describes the member</param>
        public virtual DataSourceFilterStringDescriptorBuilder Add(Expression<Func<TModel, string>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterStringDescriptorBuilder(filter);
        }

        protected virtual CompositeFilterDescriptor CreateFilter<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var composite = new CompositeFilterDescriptor
            {
                LogicalOperator = FilterCompositionLogicalOperator.And
            };

            var descriptor = new FilterDescriptor { Member = expression.MemberWithoutInstance() };

            composite.FilterDescriptors.Add(descriptor);

            Filters.Add(composite);

            return composite;
        }
    }
}