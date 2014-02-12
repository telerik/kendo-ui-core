namespace Kendo.Mvc.UI.Fluent
{
    using Extensions;
    using System;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> Model definition.
    /// </summary>
    /// <typeparam name="TModel">Type of the model</typeparam>
    public class DataSourceModelDescriptorFactoryBase<TModel> : IHideObjectMembers
        where TModel : class
    {
        protected readonly ModelDescriptor model;

        public DataSourceModelDescriptorFactoryBase(ModelDescriptor model)
        {
            this.model = model;
        }

        /// <summary>
        /// Specify the member used to identify an unique Model instance.
        /// </summary>
        /// <typeparam name="TValue">Type of the field</typeparam>
        /// <param name="expression">Member access expression which describes the member</param>
        public virtual void Id<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var dataKey = new GridDataKey<TModel, TValue>(expression);
            dataKey.RouteKey = dataKey.Name;

            model.Id = dataKey;
        }

        /// <summary>
        /// Specify the member used to identify an unique Model instance.
        /// </summary>
        /// <param name="fieldName">The member name.</param>
        public virtual void Id(string fieldName)
        {
            IGridDataKey<TModel> dataKey;
            if (typeof(TModel) == typeof(System.Data.DataRowView))
            {
                dataKey = (IGridDataKey<TModel>)new GridRowViewDataKey(fieldName);
            }
            else if (typeof(TModel).IsDynamicObject())
            {
                var lambdaExpression = ExpressionBuilder.Expression<dynamic, object>(fieldName);
                dataKey = (IGridDataKey<TModel>)new GridDynamicDataKey(fieldName, lambdaExpression);
            }
            else
            {
                dataKey = GetDataKeyForField(fieldName);
            }

            dataKey.RouteKey = dataKey.Name;

            model.Id = dataKey;
        }

        protected IGridDataKey<TModel> GetDataKeyForField(string fieldName)
        {
            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(fieldName);
            var columnType = typeof(GridDataKey<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });
            var constructor = columnType.GetConstructor(new[] { lambdaExpression.GetType() });

            return (IGridDataKey<TModel>)constructor.Invoke(new object[] { lambdaExpression });
        }
    }
}
