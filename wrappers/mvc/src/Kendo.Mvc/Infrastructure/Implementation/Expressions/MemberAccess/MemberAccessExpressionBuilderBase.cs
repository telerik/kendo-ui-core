namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Linq.Expressions;

    internal abstract class MemberAccessExpressionBuilderBase : ExpressionBuilderBase
    {
        private readonly string memberName;

        protected MemberAccessExpressionBuilderBase(Type itemType, string memberName) : base(itemType)
        {
            this.memberName = memberName;
        }

        public string MemberName
        {
            get
            {
                return this.memberName;
            }
        }

        public abstract Expression CreateMemberAccessExpression();

        internal LambdaExpression CreateLambdaExpression()
        {
            Expression memberExpression = this.CreateMemberAccessExpression();
            return Expression.Lambda(memberExpression, this.ParameterExpression);
        }
    }
}