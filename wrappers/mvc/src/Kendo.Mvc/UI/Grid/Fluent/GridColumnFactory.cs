namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System.Collections;
    using System.Web.Mvc;
    /// <summary>
    /// Creates columns for the <see cref="Grid{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the grid is bound to</typeparam>
    public class GridColumnFactory<TModel> : IHideObjectMembers 
        where TModel : class
    {
        private bool hasGeneratedColumn;
        private IUrlGenerator urlGenerator;
        private ViewContext viewContext;

        public GridColumnFactory(Grid<TModel> container, ViewContext viewContext, IUrlGenerator urlGenerator) 
            : this(container, viewContext, urlGenerator, container)
        { }

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public GridColumnFactory(Grid<TModel> container, ViewContext viewContext, IUrlGenerator urlGenerator, IGridColumnContainer<TModel> columnsContainer)
        {
            Container = container;
            ColumnsContainer = columnsContainer;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        public Grid<TModel> Container
        {
            get;
            private set;
        }

        public IGridColumnContainer<TModel> ColumnsContainer
        {
            get;
            private set;
        }

        public void LoadSettings(IEnumerable<GridColumnSettings> settings)
        {
            var generator = new GridColumnGenerator<TModel>(Container);

            foreach (var setting in settings)
            {
                ColumnsContainer.Columns.Add(generator.CreateColumn(setting));
            }
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="expression"></param>
        /// <returns></returns>
        public virtual GridBoundColumnBuilder<TModel> Bound<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            GridBoundColumn<TModel, TValue> column = new GridBoundColumn<TModel, TValue>(Container, expression);

            ColumnsContainer.Columns.Add(column);

            return new GridBoundColumnBuilder<TModel>(column, this.viewContext, this.urlGenerator);
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        public virtual GridBoundColumnBuilder<TModel> Bound(string memberName)
        {
            return Bound(null, memberName);
        }

        public GridColumnFactory<TModel> Group(Action<GridColumnGroupBuilder<TModel>> configurator)
        {
            var group = new GridColumnGroup<TModel>(Container);
            ColumnsContainer.Columns.Add(group);

            var factory = new GridColumnGroupBuilder<TModel>(group, Container, viewContext, urlGenerator);

            configurator(factory);

            return this;
        }

        /// <summary>
        /// Defines a bound column.
        /// </summary>
        public virtual GridBoundColumnBuilder<TModel> Bound(Type memberType, string memberName)
        {
            const bool liftMemberAccess = false;

            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(memberType, memberName, liftMemberAccess);

            if (typeof(TModel).IsDynamicObject() && memberType != null && lambdaExpression.Body.Type.GetNonNullableType() != memberType.GetNonNullableType())
            {
                lambdaExpression = Expression.Lambda(Expression.Convert(lambdaExpression.Body, memberType), lambdaExpression.Parameters);
            }
            var columnType = typeof(GridBoundColumn<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });

            var constructor = columnType.GetConstructor(new[] { Container.GetType(), lambdaExpression.GetType() });

            var column = (IGridBoundColumn)constructor.Invoke(new object[] { Container, lambdaExpression });
            
            column.Member = memberName;

            if (!column.Title.HasValue())
            {
                column.Title = memberName.AsTitle();
            }
            
            if (memberType != null)
            {
                column.MemberType = memberType;
            }

            ColumnsContainer.Columns.Add((GridColumnBase<TModel>)column);

            return new GridBoundColumnBuilder<TModel>(column, this.viewContext, this.urlGenerator);
        }
                
        /// <summary>
        /// Defines a foreign key column.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="expression">The member which matches the selected item</param>
        /// <param name="data">The foreign data</param>
        /// <param name="dataFieldValue">The data value field</param>
        /// <param name="dataFieldText">The data text field</param>
        /// <returns></returns>
        public virtual GridBoundColumnBuilder<TModel> ForeignKey<TValue>(Expression<Func<TModel, TValue>> expression, IEnumerable data, 
            string dataFieldValue, string dataFieldText)
        {
            return ForeignKey(expression, new SelectList(data, dataFieldValue, dataFieldText));
        }

        /// <summary>
        /// Defines a foreign key column.
        /// </summary>
        /// <typeparam name="TValue">Member type</typeparam>
        /// <param name="expression">The member which matches the selected item</param>
        /// <param name="data">The foreign data</param>
        /// <returns></returns>
        public virtual GridBoundColumnBuilder<TModel> ForeignKey<TValue>(Expression<Func<TModel, TValue>> expression, SelectList data)
        {            
            GridForeignKeyColumn<TModel, TValue> column = new GridForeignKeyColumn<TModel, TValue>(Container, expression, data);

            column.Data = data;

            ColumnsContainer.Columns.Add(column);

            return new GridBoundColumnBuilder<TModel>(column, this.viewContext, this.urlGenerator);
        }

        public virtual GridBoundColumnBuilder<TModel> ForeignKey(string memberName, IEnumerable data,
            string dataFieldValue, string dataFieldText)
        {
            return ForeignKey(null, memberName, new SelectList(data, dataFieldValue, dataFieldText));
        }

        public virtual GridBoundColumnBuilder<TModel> ForeignKey(string memberName, SelectList data)
        {
            return ForeignKey(null, memberName, data);
        }

        public virtual GridBoundColumnBuilder<TModel> ForeignKey(Type memberType, string memberName, IEnumerable data,
            string dataFieldValue, string dataFieldText)
        {
            return ForeignKey(memberType, memberName, new SelectList(data, dataFieldValue, dataFieldText));
        }

        public virtual GridBoundColumnBuilder<TModel> ForeignKey(Type memberType, string memberName, SelectList data)
        {
            const bool liftMemberAccess = false;

            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(memberType, memberName, liftMemberAccess);

            if (typeof(TModel).IsDynamicObject() && memberType != null && lambdaExpression.Body.Type.GetNonNullableType() != memberType.GetNonNullableType())
            {
                lambdaExpression = Expression.Lambda(Expression.Convert(lambdaExpression.Body, memberType), lambdaExpression.Parameters);
            }

            var columnType = typeof(GridForeignKeyColumn<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });

            var constructor = columnType.GetConstructor(new[] { Container.GetType(), lambdaExpression.GetType(), data.GetType() });

            var column = (IGridBoundColumn)constructor.Invoke(new object[] { Container, lambdaExpression, data });

            column.Member = memberName;

            if (!column.Title.HasValue())
            {
                column.Title = memberName.AsTitle();
            }

            if (memberType != null)
            {
                column.MemberType = memberType;
            }

            ColumnsContainer.Columns.Add((GridColumnBase<TModel>)column);

            return new GridBoundColumnBuilder<TModel>(column, this.viewContext, this.urlGenerator);
        }

        protected virtual void AutoGenerate(bool shouldGenerate, Action<GridColumnBase<TModel>> columnAction)
        {
            if (hasGeneratedColumn) return;

            if (shouldGenerate)
            {
                new GridColumnGenerator<TModel>(Container)
                    .GetColumns()
                    .Each(c =>
                              {
                                  if (columnAction != null)
                                  {
                                      columnAction(c);
                                  }
                                  ColumnsContainer.Columns.Add(c);
                              });
                hasGeneratedColumn = true;
            }
            Container.AutoGenerateColumns = shouldGenerate;
        }

        /// <summary>
        /// Determines if columns should be automatically generated.
        /// </summary>
        /// <param name="shouldGenerate">If true columns should be generated, otherwise false.</param>
        public virtual void AutoGenerate(bool shouldGenerate)
        {
            AutoGenerate(shouldGenerate, null);
        }

        /// <summary>
        /// Determines if columns should be automatically generated.
        /// </summary>
        /// <param name="columnAction">Action which will be executed for each generated column.</param>
        public virtual void AutoGenerate(Action<GridColumnBase<TModel>> columnAction)
        {
            AutoGenerate(true, columnAction);
        }

        /// <summary>
        /// Defines a template column.
        /// </summary>
        /// <param name="templateAction"></param>
        /// <returns></returns>
        public virtual GridTemplateColumnBuilder<TModel> Template(Action<TModel> templateAction)
        {
            GridTemplateColumn<TModel> column = new GridTemplateColumn<TModel>(Container, templateAction);
            ColumnsContainer.Columns.Add(column);

            return new GridTemplateColumnBuilder<TModel>(column);
        }

        public virtual GridTemplateColumnBuilder<TModel> Template(Func<TModel, object> template)
        {
            GridTemplateColumn<TModel> column = new GridTemplateColumn<TModel>(Container, template);
            ColumnsContainer.Columns.Add(column);

            return new GridTemplateColumnBuilder<TModel>(column);
        }

        /// <summary>
        /// Defines a command column.
        /// </summary>
        /// <param name="commandAction"></param>
        /// <returns></returns>
        public virtual GridActionColumnBuilder Command(Action<GridActionCommandFactory<TModel>> commandAction)
        {
            GridActionColumn<TModel> column = new GridActionColumn<TModel>(Container);
            
            commandAction(new GridActionCommandFactory<TModel>(column));

            ColumnsContainer.Columns.Add(column);

            return new GridActionColumnBuilder(column);
        }
    }
}
