namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System.Collections;

    /// <summary>
    /// Represents chart pie series
    /// </summary>
    /// <typeparam name="TModel">The Chart model type</typeparam>
    /// <typeparam name="TValue">The value type</typeparam>
    public class ChartDonutSeries<TModel, TValue> : ChartPieSeries<TModel, TValue>, IChartDonutSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDonutSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="expressionValue">The value expression.</param>
        /// <param name="expressionCategory">The category expression.</param>
        /// <param name="expressionColor">The color expression.</param>
        /// <param name="expressionExplode">The explode expression.</param>
        /// <param name="expressionVisibleInLegend">The visibleInLegend expression.</param>
        public ChartDonutSeries(
            Chart<TModel> chart,
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> expressionCategory,
            Expression<Func<TModel,string>> expressionColor,
            Expression<Func<TModel, bool>> expressionExplode,
            Expression<Func<TModel, bool>> expressionVisibleInLegend)
            : base(chart, expressionValue, expressionCategory, expressionColor, expressionExplode, expressionVisibleInLegend)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDonutSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        /// <param name="data">The data.</param>
        public ChartDonutSeries(Chart<TModel> chart, IEnumerable data)
            : base(chart, data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDonutSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartDonutSeries(Chart<TModel> chart)
            : base(chart)
        {
            Initialize();
        }
        /// <summary>
        /// Gets or sets the margin of the donut series.
        /// </summary>
        public int? Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the the size of the donut hole.
        /// </summary>
        public int? HoleSize
        {
            get;
            set;
        }

        private void Initialize()
        {
            Type = "donut";
        }

        /// <summary>
        /// Gets or sets the the size of the donut series.
        /// </summary>
        public int? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer for the series
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartDonutSeriesSerializer(this);
        }
    }
}