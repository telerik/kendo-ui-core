// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Globalization;
    using System.Linq.Expressions;

    using Extensions;

    internal class FilterDescriptorExpressionBuilder : FilterExpressionBuilder
    {
        private readonly FilterDescriptor descriptor;

        public FilterDescriptorExpressionBuilder(ParameterExpression parameterExpression, FilterDescriptor descriptor)
            : base(parameterExpression)
        {
            this.descriptor = descriptor;
        }

        public FilterDescriptor FilterDescriptor
        {
            get
            {
                return this.descriptor;
            }
        }

        /// <exception cref="ArgumentException"><c>ArgumentException</c>.</exception>
        public override Expression CreateBodyExpression()
        {
            Expression memberExpression = this.CreateMemberExpression();

            Type memberType = memberExpression.Type;

            Expression valueExpression = CreateValueExpression(memberType, this.descriptor.Value, CultureInfo.InvariantCulture);

            bool isConversionSuccessful = true;

            if (TypesAreDifferent(this.descriptor, memberExpression, valueExpression))
            {
                if (!TryConvertExpressionTypes(ref memberExpression, ref valueExpression))
                {
                    isConversionSuccessful = false;
                }
            }
            else if (memberExpression.Type.IsEnumType() || valueExpression.Type.IsEnumType())
            {
                if (!TryPromoteNullableEnums(ref memberExpression, ref valueExpression))
                {
                    isConversionSuccessful = false;
                }
            }
            else if (memberType.IsNullableType() && (memberExpression.Type != valueExpression.Type))
            {
                if (!TryConvertNullableValue(memberExpression, ref valueExpression))
                {
                    isConversionSuccessful = false;
                }
            }

            if (!isConversionSuccessful)
            {
                throw new ArgumentException(
                    string.Format(
                        CultureInfo.InvariantCulture,
                        "Operator '{0}' is incompatible with operand types '{1}' and '{2}'",
                        this.descriptor.Operator,
                        memberExpression.Type.GetTypeName(),
                        valueExpression.Type.GetTypeName()));
            }

            return this.descriptor.Operator.CreateExpression(memberExpression, valueExpression, Options.LiftMemberAccessToNull);
        }

        public FilterDescription CreateFilterDescription()
        {
            LambdaExpression filterExpression = this.CreateFilterExpression();

            Delegate predicate = filterExpression.Compile();

            return new PredicateFilterDescription(predicate);
        }

        protected virtual Expression CreateMemberExpression()
        {
            var memberType = this.FilterDescriptor.MemberType;

            var memberAccessBuilder =
                            ExpressionBuilderFactory.MemberAccess(this.ParameterExpression.Type, memberType, this.FilterDescriptor.Member);
            memberAccessBuilder.Options.CopyFrom(this.Options); 
            
            memberAccessBuilder.ParameterExpression = this.ParameterExpression;

            Expression memberAccessExpression = memberAccessBuilder.CreateMemberAccessExpression();

            if (memberType != null && memberAccessExpression.Type.GetNonNullableType() != memberType.GetNonNullableType())
            {
                memberAccessExpression = Expression.Convert(memberAccessExpression, memberType);
            }

            return memberAccessExpression;
        }

        private static Expression CreateConstantExpression(object value)
        {
            if (value == null)
            {
                return ExpressionConstants.NullLiteral;
            }
            return Expression.Constant(value);
        }

        private static Expression CreateValueExpression(Type targetType, object value, CultureInfo culture)
        {
            if (((targetType != typeof(string)) && (!targetType.IsValueType || targetType.IsNullableType())) &&
                (string.Compare(value as string, "null", StringComparison.OrdinalIgnoreCase) == 0))
            {
                value = null;
            }
            if (value != null)
            {
                Type nonNullableTargetType = targetType.GetNonNullableType();
                if (value.GetType() != nonNullableTargetType)
                {
                    if (nonNullableTargetType.IsEnum)
                    {
                        value = Enum.Parse(nonNullableTargetType, value.ToString(), true);
                    }
                    else if (value is IConvertible)
                    {
                        value = Convert.ChangeType(value, nonNullableTargetType, culture);
                    }
                }
            }

            return CreateConstantExpression(value);
        }

        private static Expression PromoteExpression(Expression expr, Type type, bool exact)
        {
            if (expr.Type == type)
            {
                return expr;
            }
            var ce = expr as ConstantExpression;
            //TODO: check here
            if (((ce != null) && (ce == ExpressionConstants.NullLiteral)) && !(type.IsValueType && !type.IsNullableType()))
            {
                return Expression.Constant(null, type);
            }
            if (expr.Type.IsCompatibleWith(type))
            {
                if (type.IsValueType || exact)
                {
                    return Expression.Convert(expr, type);
                }
                return expr;
            }
            return null;
        }

        private static bool TryConvertExpressionTypes(ref Expression memberExpression, ref Expression valueExpression)
        {
            if (memberExpression.Type != valueExpression.Type)
            {
                if (!memberExpression.Type.IsAssignableFrom(valueExpression.Type))
                {
                    if (!valueExpression.Type.IsAssignableFrom(memberExpression.Type))
                    {
                        return false;
                    }
                    memberExpression = Expression.Convert(memberExpression, valueExpression.Type);
                }
                else
                {
                    valueExpression = Expression.Convert(valueExpression, memberExpression.Type);
                }
            }

            return true;
        }

        private static bool TryConvertNullableValue(Expression memberExpression, ref Expression valueExpression)
        {
            var ce = valueExpression as ConstantExpression;
            if (ce != null)
            {
                try
                {
                    valueExpression = Expression.Constant(ce.Value, memberExpression.Type);
                }
                catch (ArgumentException)
                {
                    return false;
                }
            }
            return true;
        }

        private static bool TryPromoteNullableEnums(ref Expression memberExpression, ref Expression valueExpression)
        {
            if (memberExpression.Type != valueExpression.Type)
            {
                Expression e = PromoteExpression(valueExpression, memberExpression.Type, true);
                if (e == null)
                {
                    e = PromoteExpression(memberExpression, valueExpression.Type, true);
                    if (e == null)
                    {
                        return false;
                    }
                    memberExpression = e;
                }
                else
                {
                    valueExpression = e;
                }
            }
            return true;
        }

        private static bool TypesAreDifferent(FilterDescriptor descriptor, Expression memberExpression, Expression valueExpression)
        {
            bool isEqualityOperator = descriptor.Operator == FilterOperator.IsEqualTo ||
                                      descriptor.Operator == FilterOperator.IsNotEqualTo;

            return isEqualityOperator && !memberExpression.Type.IsValueType && !valueExpression.Type.IsValueType;
        }
    }
}