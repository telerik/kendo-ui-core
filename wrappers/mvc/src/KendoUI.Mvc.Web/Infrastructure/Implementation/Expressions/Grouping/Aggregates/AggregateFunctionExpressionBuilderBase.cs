// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;

    using Extensions;
    internal abstract class AggregateFunctionExpressionBuilderBase : ExpressionBuilderBase
    {
        private readonly AggregateFunction function;
        private readonly Expression enumerableExpression;

        protected AggregateFunction Function
        {
            get
            {
                return this.function;
            }
        }

        protected Expression EnumerableExpression
        {
            get
            {
                return this.enumerableExpression;
            }
        }

        /// <exception cref="ArgumentException">
        /// Provided <paramref name="enumerableExpression"/>'s <see cref="Expression.Type"/> is not <see cref="IEnumerable{T}"/>
        /// </exception>
        protected AggregateFunctionExpressionBuilderBase(Expression enumerableExpression, AggregateFunction function)
            : base(ExtractItemTypeFromEnumerableType(enumerableExpression.Type))
        {
            this.enumerableExpression = enumerableExpression;
            this.function = function;
        }

        public abstract Expression CreateAggregateExpression();

        /// <exception cref="ArgumentException">Provided type is not <see cref="IEnumerable{T}"/></exception>
        private static Type ExtractItemTypeFromEnumerableType(Type type)
        {
            var enumerableType = type.FindGenericType(typeof(IEnumerable<>));
            
            if (enumerableType == null)
            {
                throw new ArgumentException("Provided type is not IEnumerable<>", "type");
            }

            return enumerableType.GetGenericArguments().First();
        }
    }
}