namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    public class ChartRadarLineSeries<TModel, TValue, TCategory> : ChartLineSeriesBase<TModel, TValue, TCategory>, IChartRadarLineSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        /// <param name="categoryExpression">The expression used to extract the point category from the chart model.</param>
        /// <param name="noteTextExpression">The expression used to extract the point note text from the chart model.</param>
        public ChartRadarLineSeries(Expression<Func<TModel, TValue>> expression, Expression<Func<TModel, TCategory>> categoryExpression, Expression<Func<TModel, string>> noteTextExpression)
            : base(expression, categoryExpression, noteTextExpression)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue, TCategory}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarLineSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue, TCategory}" /> class.
        /// </summary>
        public ChartRadarLineSeries()
            : base()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRadarLineSeriesSerializer(this);
        }

        /// <summary>
        /// The style of the line.
        /// </summary>
        public ChartRadarLineStyle Style
        {
            get;
            set;
        }

        protected override void Initialize()
        {
            base.Initialize();
            Style = ChartRadarLineStyle.Normal;
        }
    }

    public class ChartRadarLineSeries<TModel, TValue> : ChartRadarLineSeries<TModel, TValue, string> where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the point value from the chart model.</param>
        public ChartRadarLineSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression, null, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartRadarLineSeries(IEnumerable data)
            : base(data)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartRadarLineSeries()
        {
        }
    }
}