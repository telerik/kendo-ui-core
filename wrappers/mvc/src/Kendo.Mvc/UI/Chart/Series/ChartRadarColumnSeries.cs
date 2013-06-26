namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    public class ChartRadarColumnSeries<TModel, TValue, TCategory> : ChartBarSeries<TModel, TValue, TCategory> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="colorExpression">The expression used to extract the point color from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        public ChartRadarColumnSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, string>> colorExpression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, colorExpression, categoryExpression, noteTextExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarColumnSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartRadarColumnSeries()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRadarColumnSeriesSerializer(this);
        }
    }

    public class ChartRadarColumnSeries<TModel, TValue> : ChartRadarColumnSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="colorExpression">The expression used to extract the point color from the chart model.</param>
        public ChartRadarColumnSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, string>> colorExpression)
            : base(expression, colorExpression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarColumnSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartRadarColumnSeries()
        {
        }
    }
}