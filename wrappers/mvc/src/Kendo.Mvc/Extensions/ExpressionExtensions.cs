namespace Kendo.Mvc.Extensions
{
    using System.Linq.Expressions;
    using System.Web.Mvc;

    public static class ExpressionExtensions
    {
        public static string MemberWithoutInstance(this LambdaExpression expression)
        {
            return ExpressionHelper.GetExpressionText(expression);
        }

        public static bool IsBindable(this LambdaExpression expression)
        {
            switch(expression.Body.NodeType)
            {
                case ExpressionType.MemberAccess:
                case ExpressionType.Parameter:
                    return true;
            }

            return false;
        }
        
        public static MemberExpression ToMemberExpression(this LambdaExpression expression)
        {
            MemberExpression memberExpression = expression.Body as MemberExpression;

            if (memberExpression == null)
            {
                UnaryExpression unaryExpression = expression.Body as UnaryExpression;

                if (unaryExpression != null)
                {
                    memberExpression = unaryExpression.Operand as MemberExpression;
                }
            }

            return memberExpression;
        }


    }
}
