namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Extensions;
    using Kendo.Mvc.Infrastructure;

    public class DataSourceModelDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly ModelDescriptor model;

        public DataSourceModelDescriptorFactory(ModelDescriptor model)
        {
            this.model = model;
        }

        public virtual void Id<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var dataKey = new GridDataKey<TModel, TValue>(expression);            
            dataKey.RouteKey = dataKey.Name;
         
            model.Id = dataKey;
        }

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

        private IGridDataKey<TModel> GetDataKeyForField(string fieldName)
        {
            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(fieldName);
            var columnType = typeof(GridDataKey<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });
            var constructor = columnType.GetConstructor(new[] { lambdaExpression.GetType() });

            return (IGridDataKey<TModel>)constructor.Invoke(new object[] { lambdaExpression });
        }

        public virtual DataSourceModelFieldDescriptorBuilder<TValue> Field<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return AddFieldDescriptor<TValue>(expression.MemberWithoutInstance(), typeof(TValue));
        }

        private DataSourceModelFieldDescriptorBuilder<TValue> AddFieldDescriptor<TValue>(string memberName, Type memberType)
        {
            Guard.IsNotNullOrEmpty(memberName, "memberName");
            Guard.IsNotNull(memberType, "memberType");

            var descriptor = model.AddDescriptor(memberName);
            
            descriptor.MemberType = memberType;

            model.Fields.Add(descriptor);

            return new DataSourceModelFieldDescriptorBuilder<TValue>(descriptor);            
        }
    }
}
