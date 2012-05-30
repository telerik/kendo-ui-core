namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Linq.Expressions;

    internal class ExpressionConstants
    {
        internal static Expression TrueLiteral
        {
            get { return Expression.Constant(true); }
        }

        internal static Expression FalseLiteral
        {
            get { return Expression.Constant(false); }
        }

        internal static Expression NullLiteral
        {
            get { return Expression.Constant(null); }
        }
    }
}
