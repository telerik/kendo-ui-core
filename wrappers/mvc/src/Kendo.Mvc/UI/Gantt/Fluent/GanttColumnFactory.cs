namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Gantt for ASP.NET MVC
    /// </summary>
    public class GanttColumnFactory<TTaskModel, TDependenciesModel>
        where TTaskModel : class, IGanttTask
        where TDependenciesModel : class, IGanttDependency
    {
        private readonly Gantt<TTaskModel, TDependenciesModel> container;

        public GanttColumnFactory(Gantt<TTaskModel, TDependenciesModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        /// <typeparam name="TTaskModel"></typeparam>
        /// <param name="expression"></param>
        /// <returns></returns>
        public virtual GanttBoundColumnBuilder<TTaskModel, TDependenciesModel> Bound<TValue>(Expression<Func<TTaskModel, TValue>> expression)
        {
            var column = new GanttBoundColumn<TTaskModel, TValue>(expression);

            container.Columns.Add(column);

            return new GanttBoundColumnBuilder<TTaskModel, TDependenciesModel>(column);
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        public virtual GanttBoundColumnBuilder<TTaskModel, TDependenciesModel> Bound(string memberName)
        {
            return Bound(null, memberName);
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        public virtual GanttBoundColumnBuilder<TTaskModel, TDependenciesModel> Bound(Type memberType, string memberName)
        {
            const bool liftMemberAccess = false;

            var lambdaExpression = ExpressionBuilder.Lambda<TTaskModel>(memberType, memberName, liftMemberAccess);

            if (typeof(TTaskModel).IsDynamicObject() && memberType != null && lambdaExpression.Body.Type.GetNonNullableType() != memberType.GetNonNullableType())
            {
                lambdaExpression = Expression.Lambda(Expression.Convert(lambdaExpression.Body, memberType), lambdaExpression.Parameters);
            }
            var columnType = typeof(GanttBoundColumn<,>).MakeGenericType(new[] { typeof(TTaskModel), lambdaExpression.Body.Type });

            var constructor = columnType.GetConstructor(new[] { lambdaExpression.GetType() });

            var column = (IGanttBoundColumn)constructor.Invoke(new object[] { lambdaExpression });

            column.Member = memberName;

            if (!column.Title.HasValue())
            {
                column.Title = memberName.AsTitle();
            }

            if (memberType != null)
            {
                column.MemberType = memberType;
            }

            container.Columns.Add((GanttColumnBase<TTaskModel>)column);

            return new GanttBoundColumnBuilder<TTaskModel, TDependenciesModel>(column);
        }
    }
}

