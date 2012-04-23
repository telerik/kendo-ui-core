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
    
    internal class EnumerableSelectorAggregateFunctionExpressionBuilder : AggregateFunctionExpressionBuilderBase
    {
        protected new EnumerableSelectorAggregateFunction Function
        {
            get
            {
                return (EnumerableSelectorAggregateFunction) base.Function;
            }
        }

        /// <exception cref="ArgumentException">
        /// Provided <paramref name="enumerableExpression"/>'s <see cref="Expression.Type"/> is not <see cref="IEnumerable{T}"/>
        /// </exception>
        public EnumerableSelectorAggregateFunctionExpressionBuilder(Expression enumerableExpression, EnumerableSelectorAggregateFunction function)
            : base(enumerableExpression, function)
        {
        }

        public override Expression CreateAggregateExpression()
        {
            LambdaExpression memberSelectorExpression = this.CreateMemberSelectorExpression();

            return this.CreateMethodCallExpression(memberSelectorExpression);
        }

        private LambdaExpression CreateMemberSelectorExpression()
        {
            var memberAccessBuilder = ExpressionBuilderFactory.MemberAccess(this.ItemType, null, this.Function.SourceField);
            memberAccessBuilder.Options.CopyFrom(this.Options);

            var memberExpression = memberAccessBuilder.CreateMemberAccessExpression();           

            memberExpression = ConvertMemberAccessExpression(memberExpression);            

            return Expression.Lambda(memberExpression, memberAccessBuilder.ParameterExpression);
        }

        private Expression CreateMethodCallExpression(LambdaExpression memberSelectorExpression)
        {
            var typeArguments = this.GetMethodArgumentsTypes(memberSelectorExpression);

            return Expression.Call(
                this.Function.ExtensionMethodsType,
                this.Function.AggregateMethodName,
                typeArguments.ToArray(),
                this.EnumerableExpression, memberSelectorExpression);
        }

        private IEnumerable<Type> GetMethodArgumentsTypes(LambdaExpression memberSelectorExpression)
        {
            yield return this.ItemType;

            if (!memberSelectorExpression.Body.Type.IsNumericType())
            {
                yield return memberSelectorExpression.Body.Type;
            }
        }

        private Expression ConvertMemberAccessExpression(Expression memberExpression)
        {
            if ((ItemType.IsDataRow()
#if MVC3
                || ItemType.IsDynamicObject()
#endif
                ) && Function.MemberType != null)
            {
                memberExpression = Expression.Convert(memberExpression, Function.MemberType);
            }

            //Numeric types with less bits than Int32 have to be converted to Int32, 
            //so that appropriate extension method will be called.
            var memberType = memberExpression.Type.GetNonNullableType();
            if (ShouldConvertTypeToInteger(memberType))
            {
                memberExpression = ConvertMemberExpressionToInteger(memberExpression);
            }
            return memberExpression;
        }       

        private static Expression ConvertMemberExpressionToInteger(Expression expression)
        {
            var targetType = expression.Type.IsNullableType() ? typeof(int?) : typeof(int);

            return Expression.Convert(expression, targetType);
        }

        private static bool ShouldConvertTypeToInteger(Type type)
        {
            switch (Type.GetTypeCode(type))
            {
                case TypeCode.SByte:
                case TypeCode.Int16:
                case TypeCode.Byte:
                case TypeCode.UInt16:
                {
                    return true;
                }
            }

            return false;
        }
    }
}