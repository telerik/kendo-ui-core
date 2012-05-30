namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Data;
    using System.Linq.Expressions;
    using System.Reflection;

    using Extensions;
    internal class DataRowFieldAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        private readonly Type columnDataType;

        private static readonly MethodInfo DataRowFieldMethod =
            typeof(DataRowExtensions).GetMethod("Field", new[] { typeof(DataRow), typeof(string) });

        public DataRowFieldAccessExpressionBuilder(Type memberType, string memberName) : base(typeof(DataRow), memberName)
        {
            //Handle value types for null and DBNull.Value support converting them to Nullable<>
            if (memberType.IsValueType && !memberType.IsNullableType())
            {
                this.columnDataType = typeof(Nullable<>).MakeGenericType(memberType);
            }
            else
            {
                this.columnDataType = memberType;
            }
        }

        public Type ColumnDataType
        {
            get
            {
                return this.columnDataType;
            }
        }

        public override Expression CreateMemberAccessExpression()
        {
            ConstantExpression columnNameExpression = Expression.Constant(this.MemberName);

            MethodCallExpression fieldExtensionMethodExpression =
                Expression.Call(
                    DataRowFieldMethod.MakeGenericMethod(this.columnDataType),
                    this.ParameterExpression,
                    columnNameExpression);

            return fieldExtensionMethodExpression;
        }
    }
}