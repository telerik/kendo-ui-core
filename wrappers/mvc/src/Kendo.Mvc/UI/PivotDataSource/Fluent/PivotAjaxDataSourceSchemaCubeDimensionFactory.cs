namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PivotDataSourceSchemaCube"/> Dimensions.
    /// </summary>
    public class PivotAjaxDataSourceSchemaCubeDimensionFactory<TModel>
        where TModel : class
    {
        protected readonly IList<PivotDataSourceSchemaDimensionDescriptor> dimensions;

        public PivotAjaxDataSourceSchemaCubeDimensionFactory(IList<PivotDataSourceSchemaDimensionDescriptor> dimensions)
        {
            this.dimensions = dimensions;
        }

        /// <summary>
        /// Defines a PivotGrid DataSource Cube Dimension and set it's member.
        /// </summary>
        /// <param name="member">The member</param>
        public PivotAjaxDataSourceSchemaCubeDimensionBuilder Add(string member)
        {
            return AddDimensionDescriptor(member);
        }

        /// <summary>
        /// Describes a Model field
        /// </summary>
        /// <typeparam name="TValue">Field type</typeparam>
        /// <param name="expression">Member access expression which describes the field</param>
        public PivotAjaxDataSourceSchemaCubeDimensionBuilder Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddDimensionDescriptor(expression.MemberWithoutInstance());
        }

        private PivotAjaxDataSourceSchemaCubeDimensionBuilder AddDimensionDescriptor(string member)
        {
            var descriptor = dimensions.FirstOrDefault(f => f.Member == member);
            if (descriptor == null)
            {
                descriptor = new PivotDataSourceSchemaDimensionDescriptor { Member = member };
            }

            dimensions.Add(descriptor);

            return new PivotAjaxDataSourceSchemaCubeDimensionBuilder(descriptor);
        }
    }
}
