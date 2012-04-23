// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
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