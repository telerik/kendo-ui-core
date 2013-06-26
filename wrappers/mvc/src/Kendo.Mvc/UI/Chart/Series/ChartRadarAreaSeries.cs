namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    public class ChartRadarAreaSeries<TModel, TValue, TCategory> : ChartAreaSeries<TModel, TValue, TCategory> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartRadarAreaSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, categoryExpression, noteTextExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarAreaSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartRadarAreaSeries()
            : base()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRadarAreaSeriesSerializer(this);
        }
    }

    public class ChartRadarAreaSeries<TModel, TValue> : ChartRadarAreaSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        public ChartRadarAreaSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarAreaSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartRadarAreaSeries()
        {
        }
    }
}