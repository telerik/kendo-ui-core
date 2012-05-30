namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;

    using Extensions;
    using Infrastructure;

    public class DataSourceFilterDescriptorFactory<TModel> : IHideObjectMembers where TModel : class
    {
        public DataSourceFilterDescriptorFactory(IList<IFilterDescriptor> filters)
        {

            Filters = filters;
        }

        protected IList<IFilterDescriptor> Filters { get; private set; }

        public virtual DataSourceFilterEqualityDescriptorBuilder<bool> Add(Expression<Func<TModel, bool>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterEqualityDescriptorBuilder<bool>(filter);
        }

        public virtual DataSourceFilterEqualityDescriptorBuilder<bool?> Add(Expression<Func<TModel, bool?>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterEqualityDescriptorBuilder<bool?>(filter);
        }

        public virtual DataSourceFilterComparisonDescriptorBuilder<TValue> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterComparisonDescriptorBuilder<TValue>(filter);
        }

        public virtual DataSourceFilterStringDescriptorBuilder Add(Expression<Func<TModel, string>> expression)
        {
            var filter = CreateFilter(expression);

            return new DataSourceFilterStringDescriptorBuilder(filter);
        }

        public virtual void AddRange(IEnumerable<IFilterDescriptor> filters)
        {
            foreach (var filter in filters)
            {
                var composite = filter as CompositeFilterDescriptor;

                if (composite == null)
                {
                    composite = new CompositeFilterDescriptor
                    {
                        LogicalOperator = FilterCompositionLogicalOperator.And
                    };

                    composite.FilterDescriptors.Add(filter);
                }

                Filters.Add(composite);
            }
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