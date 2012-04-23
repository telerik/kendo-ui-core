// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;

    using Infrastructure.Implementation.Expressions;

    public static class ExpressionBuilder
    {
        public static Expression<Func<TModel, TValue>> Expression<TModel, TValue>(string memberName)
        {
            return (Expression<Func<TModel, TValue>>)Lambda<TModel>(memberName);
        }

        public static LambdaExpression Lambda<T>(string memberName)
        {
            return Lambda<T>(memberName, false);
        }

        public static LambdaExpression Lambda<T>(Type memberType, string memberName, bool checkForNull)
        {
            MemberAccessExpressionBuilderBase expressionBuilder = ExpressionBuilderFactory.MemberAccess(typeof(T), memberType, memberName, checkForNull);

            return expressionBuilder.CreateLambdaExpression();
        }

        public static LambdaExpression Lambda<T>(string memberName, bool checkForNull)
        {
            MemberAccessExpressionBuilderBase expressionBuilder = ExpressionBuilderFactory.MemberAccess(typeof(T),  memberName, checkForNull);

            return expressionBuilder.CreateLambdaExpression();
        }

        public static Expression<Func<T, bool>> Expression<T>(IList<IFilterDescriptor> filterDescriptors)
        {
            ParameterExpression parameterExpression = System.Linq.Expressions.Expression.Parameter(typeof(T), "item");
            return (Expression<Func<T, bool>>) new FilterDescriptorCollectionExpressionBuilder(parameterExpression, filterDescriptors).CreateFilterExpression();
        }
    }
}