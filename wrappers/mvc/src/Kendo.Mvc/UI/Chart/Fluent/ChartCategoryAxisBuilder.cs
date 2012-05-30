namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Configures the category axis for the <see cref="Chart{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class ChartCategoryAxisBuilder<TModel> : ChartAxisBuilderBase<IChartCategoryAxis, ChartCategoryAxisBuilder<TModel>>
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCategoryAxisBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartCategoryAxisBuilder(Chart<TModel> chart)
            : base(chart.CategoryAxis)
        {

            Container = chart;
        }

        /// <summary>
        /// The parent Chart
        /// </summary>
        public Chart<TModel> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines bound categories.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the categories value from the chart model
        /// </param>
        public ChartCategoryAxisBuilder<TModel> Categories<TValue>(Expression<Func<TModel, TValue>> expression)
        {

            if (typeof(TModel).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(TextResource.MemberExpressionRequired);
            }

            var value = expression.Compile();

            if (Container.Data != null)
            {
                var dataList = new ArrayList();

                foreach (var dataPoint in Container.Data)
                {
                    dataList.Add(dataPoint != null ? value(dataPoint).ToString() : string.Empty);
                }

                Container.CategoryAxis.Categories = dataList;
            }
            else
            {
                Container.CategoryAxis.Member = expression.MemberWithoutInstance();
            }

            return this;
        }

        /// <summary>
        /// Defines categories.
        /// </summary>
        /// <param name="categories">
        /// The list of categories
        /// </param>
        public ChartCategoryAxisBuilder<TModel> Categories(IEnumerable categories)
        {
            
            Container.CategoryAxis.Categories = categories;

            return this;
        }

        /// <summary>
        /// Defines categories.
        /// </summary>
        /// <param name="categories">
        /// The list of categories
        /// </param>
        public ChartCategoryAxisBuilder<TModel> Categories(params string[] categories)
        {

            Container.CategoryAxis.Categories = categories;

            return this;
        }
    }
}
