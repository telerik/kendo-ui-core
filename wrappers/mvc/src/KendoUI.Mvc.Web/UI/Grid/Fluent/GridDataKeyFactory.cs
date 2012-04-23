// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Extensions;
    using Infrastructure;
    /// <summary>
    /// Creates data key for the <see cref="Grid{T}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item</typeparam>
    public class GridDataKeyFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly bool nameAsRouteKey;

        public IList<IGridDataKey<TModel>> DataKeys { get;private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="GridDataKeyFactory&lt;TModel&gt;"/> class.
        /// </summary>
        /// <param name="grid">The grid.</param>
        public GridDataKeyFactory(IList<IGridDataKey<TModel>> dataKeys, bool nameAsRouteKey)
        {
            this.nameAsRouteKey = nameAsRouteKey;
            DataKeys = dataKeys;
        }

        /// <summary>
        /// Defines a data key.
        /// </summary>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="expression"></param>
        /// <returns></returns>
        public GridDataKeyBuilder<TModel> Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var dataKey = new GridDataKey<TModel, TValue>(expression);

            if (nameAsRouteKey)
            {
                dataKey.RouteKey = dataKey.Name;
            }

            DataKeys.Add(dataKey);

            return new GridDataKeyBuilder<TModel>(dataKey);
        }

        public GridDataKeyBuilder<TModel> Add(string fieldName)
        {
            Guard.IsNotNullOrEmpty(fieldName, "fieldName");

            IGridDataKey<TModel> dataKey;
            if (typeof(TModel) == typeof(System.Data.DataRowView))
            {
                dataKey = (IGridDataKey<TModel>)new GridRowViewDataKey(fieldName);
            }
#if MVC3
            else if (typeof(TModel).IsDynamicObject())
            {
                var lambdaExpression = ExpressionBuilder.Expression<dynamic,object>(fieldName);
                dataKey = (IGridDataKey<TModel>)new GridDynamicDataKey(fieldName, lambdaExpression);
            }
#endif
            else
            {
                dataKey = GetDataKeyForField(fieldName);
            }

            if (nameAsRouteKey)
            {
                dataKey.RouteKey = dataKey.Name;
            }

            DataKeys.Add(dataKey);
            return new GridDataKeyBuilder<TModel>(dataKey);

        }

#if MVC3
        private IGridDataKey<TModel> GetDynamicDataKeyForField(string fieldName)
        {
            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(fieldName);
            var columnType = typeof(GridDataKey<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });
            var constructor = columnType.GetConstructor(new[] { lambdaExpression.GetType() });

            return (IGridDataKey<TModel>)constructor.Invoke(new object[] { lambdaExpression });
        }
#endif

        private IGridDataKey<TModel> GetDataKeyForField(string fieldName)
        {
            var lambdaExpression = ExpressionBuilder.Lambda<TModel>(fieldName);
            var columnType = typeof(GridDataKey<,>).MakeGenericType(new[] { typeof(TModel), lambdaExpression.Body.Type });
            var constructor = columnType.GetConstructor(new[] {lambdaExpression.GetType()});

            return (IGridDataKey<TModel>) constructor.Invoke(new object[] {lambdaExpression});
        }
    }
}
