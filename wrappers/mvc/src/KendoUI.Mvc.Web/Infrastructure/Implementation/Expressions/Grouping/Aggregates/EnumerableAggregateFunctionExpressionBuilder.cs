// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;

    internal class EnumerableAggregateFunctionExpressionBuilder : AggregateFunctionExpressionBuilderBase
    {
        protected new EnumerableAggregateFunction Function
        {
            get
            {
                return (EnumerableAggregateFunction) base.Function;
            }
        }

        /// <exception cref="ArgumentException">
        /// Provided <paramref name="enumerableExpression"/>'s <see cref="Expression.Type"/> is not <see cref="IEnumerable{T}"/>
        /// </exception>
        public EnumerableAggregateFunctionExpressionBuilder(Expression enumerableExpression, EnumerableAggregateFunction function)
            : base(enumerableExpression, function)
        {
        }

        public override Expression CreateAggregateExpression()
        {
            return Expression.Call(
                this.Function.ExtensionMethodsType,
                this.Function.AggregateMethodName,
                new[] { this.ItemType },
                this.EnumerableExpression);
        }
    }
}