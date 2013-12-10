namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Linq.Expressions;
    using System.Reflection;

    internal static class FilterOperatorExtensions
    {
        internal static readonly MethodInfo StringToLowerMethodInfo = typeof(string).GetMethod("ToLower", new Type[0]);
        internal static readonly MethodInfo StringStartsWithMethodInfo = typeof(string).GetMethod("StartsWith", new[] { typeof(string) });
        internal static readonly MethodInfo StringEndsWithMethodInfo = typeof(string).GetMethod("EndsWith", new[] { typeof(string) });
        internal static readonly MethodInfo StringCompareMethodInfo = typeof(string).GetMethod("Compare", new[] { typeof(string), typeof(string) });
        internal static readonly MethodInfo StringContainsMethodInfo = typeof(string).GetMethod("Contains", new[] { typeof(string) });


        /// <exception cref="InvalidOperationException"><c>InvalidOperationException</c>.</exception>
        internal static Expression CreateExpression(this FilterOperator filterOperator, Expression left, Expression right, bool liftMemberAccess)
        {
            switch (filterOperator)
            {
                case FilterOperator.IsLessThan:
                    return GenerateLessThan(left, right, liftMemberAccess);

                case FilterOperator.IsLessThanOrEqualTo:
                    return GenerateLessThanEqual(left, right, liftMemberAccess);

                case FilterOperator.IsEqualTo:
                    return GenerateEqual(left, right, liftMemberAccess);

                case FilterOperator.IsNotEqualTo:
                    return GenerateNotEqual(left, right, liftMemberAccess);

                case FilterOperator.IsGreaterThanOrEqualTo:
                    return GenerateGreaterThanEqual(left, right, liftMemberAccess);

                case FilterOperator.IsGreaterThan:
                    return GenerateGreaterThan(left, right, liftMemberAccess);

                case FilterOperator.StartsWith:
                    return GenerateStartsWith(left, right, liftMemberAccess);

                case FilterOperator.EndsWith:
                    return GenerateEndsWith(left, right, liftMemberAccess);

                case FilterOperator.Contains:
                    return GenerateContains(left, right, liftMemberAccess);

                case FilterOperator.DoesNotContain:
                    return GenerateNotContains(left, right, liftMemberAccess);

                case FilterOperator.IsContainedIn:
                    return GenerateIsContainedIn(left, right, liftMemberAccess);

            }

            throw new InvalidOperationException();
        }

        private static Expression GenerateEqual(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                left = GenerateToLowerCall(left, liftMemberAccess);
                right = GenerateToLowerCall(right, liftMemberAccess);
            }
            return Expression.Equal(left, right);
        }

        private static Expression GenerateNotEqual(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                left = GenerateToLowerCall(left, liftMemberAccess);
                right = GenerateToLowerCall(right, liftMemberAccess);
            }
            return Expression.NotEqual(left, right);
        }

        private static Expression GenerateGreaterThan(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                return Expression.GreaterThan(
                    GenerateCaseInsensitiveStringMethodCall(StringCompareMethodInfo, left, right, liftMemberAccess), 
                    ExpressionFactory.ZeroExpression);
            }
            return Expression.GreaterThan(left, right);
        }

        private static Expression GenerateGreaterThanEqual(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                return Expression.GreaterThanOrEqual(
                    GenerateCaseInsensitiveStringMethodCall(StringCompareMethodInfo, left, right, liftMemberAccess),
                    ExpressionFactory.ZeroExpression);
            }
            return Expression.GreaterThanOrEqual(left, right);
        }

        private static Expression GenerateLessThan(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                return Expression.LessThan(
                    GenerateCaseInsensitiveStringMethodCall(StringCompareMethodInfo, left, right, liftMemberAccess),
                    ExpressionFactory.ZeroExpression);
            }
            return Expression.LessThan(left, right);
        }

        private static Expression GenerateLessThanEqual(Expression left, Expression right, bool liftMemberAccess)
        {
            if (left.Type == typeof(string))
            {
                return Expression.LessThanOrEqual(
                    GenerateCaseInsensitiveStringMethodCall(StringCompareMethodInfo, left, right, liftMemberAccess), 
                    ExpressionFactory.ZeroExpression);
            }
            return Expression.LessThanOrEqual(left, right);
        }

        private static Expression GenerateNotContains(Expression left, Expression right, bool liftMemberAccess)
        {
            return Expression.Not(
                GenerateCaseInsensitiveStringMethodCall(StringContainsMethodInfo, left, right, liftMemberAccess));
        }

        private static Expression GenerateContains(Expression left, Expression right, bool liftMemberAccess)
        {
            return GenerateCaseInsensitiveStringMethodCall(StringContainsMethodInfo, left, right, liftMemberAccess);
        }

        private static Expression GenerateIsContainedIn(Expression left, Expression right, bool liftMemberAccess)
        {
            return GenerateCaseInsensitiveStringMethodCall(StringContainsMethodInfo, right, left, liftMemberAccess);
        }

        private static Expression GenerateStartsWith(Expression left, Expression right, bool liftMemberAccess)
        {
            return GenerateCaseInsensitiveStringMethodCall(StringStartsWithMethodInfo, left, right, liftMemberAccess);
        }

        private static Expression GenerateEndsWith(Expression left, Expression right, bool liftMemberAccess)
        {
            return GenerateCaseInsensitiveStringMethodCall(StringEndsWithMethodInfo, left, right, liftMemberAccess);
        }

        private static Expression GenerateCaseInsensitiveStringMethodCall(MethodInfo methodInfo, Expression left, Expression right, bool liftMemberAccess)
		{
            var leftToLower = GenerateToLowerCall(left, liftMemberAccess);
            var rightToLower = GenerateToLowerCall(right, liftMemberAccess);

            if (methodInfo.IsStatic)
            {
                return Expression.Call(methodInfo, new[] { leftToLower, rightToLower });
            }

            return Expression.Call(leftToLower, methodInfo, rightToLower);
		}

        private static Expression GenerateToLowerCall(Expression stringExpression, bool liftMemberAccess)
        {
            if (liftMemberAccess)
            {
                stringExpression = ExpressionFactory.LiftStringExpressionToEmpty(stringExpression);
            }

            return Expression.Call(stringExpression, StringToLowerMethodInfo);
        }
    }
}