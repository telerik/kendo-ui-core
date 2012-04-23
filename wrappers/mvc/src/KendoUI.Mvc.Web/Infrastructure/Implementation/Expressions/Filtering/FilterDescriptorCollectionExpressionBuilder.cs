// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System.Collections.Generic;
    using System.Linq.Expressions;

    internal class FilterDescriptorCollectionExpressionBuilder : FilterExpressionBuilder
    {
        private readonly IEnumerable<IFilterDescriptor> filterDescriptors;
        private readonly FilterCompositionLogicalOperator logicalOperator;

        public FilterDescriptorCollectionExpressionBuilder(ParameterExpression parameterExpression, IEnumerable<IFilterDescriptor> filterDescriptors)
            : this(parameterExpression, filterDescriptors, FilterCompositionLogicalOperator.And)
        {
            
        }

        public FilterDescriptorCollectionExpressionBuilder(
            ParameterExpression parameterExpression, IEnumerable<IFilterDescriptor> filterDescriptors, FilterCompositionLogicalOperator logicalOperator)
            : base(parameterExpression)
        {
            this.filterDescriptors = filterDescriptors;
            this.logicalOperator = logicalOperator;
        }

        public override Expression CreateBodyExpression()
        {
            Expression result = null;
            foreach (var descriptor in this.filterDescriptors)
            {
                InitilializeExpressionBuilderOptions(descriptor);

                var filterExpression = descriptor.CreateFilterExpression(this.ParameterExpression);

                if (result == null)
                {
                    result = filterExpression;
                }
                else
                {
                    result = ComposeExpressions(result, filterExpression, this.logicalOperator);
                }
            }

            if (result == null)
            {
                return ExpressionConstants.TrueLiteral;
            }

            return result;
        }

        private static Expression ComposeExpressions(Expression left, Expression right, FilterCompositionLogicalOperator logicalOperator)
        {
            switch (logicalOperator)
            {
                case FilterCompositionLogicalOperator.Or:
                {
                    return Expression.OrElse(left, right);
                }

                case FilterCompositionLogicalOperator.And:
                default:
                {
                    return Expression.AndAlso(left, right);
                }
            }
        }

        private void InitilializeExpressionBuilderOptions(IFilterDescriptor filterDescriptor)
        {
            var descriptor = filterDescriptor as FilterDescriptorBase;
            if (descriptor != null)
            {
                descriptor.ExpressionBuilderOptions.CopyFrom(this.Options);
            }
        }
    }
}