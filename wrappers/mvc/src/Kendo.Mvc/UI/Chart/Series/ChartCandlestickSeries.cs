namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Collections;

    public class ChartCandlestickSeries<TModel, TValue> : ChartOHLCSeries<TModel, TValue>, IChartCandlestickSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCandlestickSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="expressionOpen">The open expression.</param>
        /// <param name="expressionHigh">The high expression.</param>
        /// <param name="expressionLow">The open expression.</param>
        /// <param name="expressionClose">The high expression.</param>
        /// <param name="expressionColor">The color expression.</param>
        /// <param name="expressionBaseColor">The baseColor expression.</param>
        public ChartCandlestickSeries(
            Chart<TModel> chart,
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression,
            Expression<Func<TModel, string>> baseColorExpression
            )
            : base(chart, openExpression, highExpression, lowExpression, closeExpression, colorExpression)
        {
            if (baseColorExpression != null)
            {
                BaseColorMember = baseColorExpression.MemberWithoutInstance();
            }

            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCandlestickSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="data">The data.</param>
        public ChartCandlestickSeries(Chart<TModel> chart, IEnumerable data)
            : base(chart)
        {
            Data = data;
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCandlestickSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartCandlestickSeries(Chart<TModel> chart)
            : base(chart)
        {
            Initialize();
        }

        /// <summary>
        /// Gets the model data base color member name.
        /// </summary>
        /// <value>The model data base color member name.</value>
        public string BaseColorMember { get; set; }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        public ChartBarSeriesOverlay Overlay { get; set; }

        private void Initialize()
        {
            Type = "candlestick";
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartCandlestickSeriesSerializer(this);
        }
    }
}