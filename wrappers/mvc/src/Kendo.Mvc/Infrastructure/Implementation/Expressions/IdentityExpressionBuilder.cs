namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Linq.Expressions;

    internal class IdentityExpressionBuilder : ExpressionBuilderBase
    {
        public IdentityExpressionBuilder(Type itemType) : base(itemType)
        {
        }

        internal LambdaExpression CreateLambdaExpression()
        {
            return Expression.Lambda(this.ParameterExpression, this.ParameterExpression);
        }
    }
}