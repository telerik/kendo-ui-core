namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    /// <summary>
    /// Represents chart bar or column series
    /// </summary>
    /// <typeparam name="TModel">The Chart model type</typeparam>
    /// <typeparam name="TValue">The value type</typeparam>
    public class ChartBarSeries<TModel, TValue> : ChartBoundSeries<TModel, TValue>, IChartBarSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="chart">The parent chart</param>
        /// <param name="expression">The expression used to extract the series value from the chart model.</param>
        public ChartBarSeries(Chart<TModel> chart, Expression<Func<TModel, TValue>> expression)
            : base(chart, expression)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="chart">The parent chart</param>
        /// <param name="data">The data to bind to.</param>
        public ChartBarSeries(Chart<TModel> chart, IEnumerable data)
            : base(chart, data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartBarSeries(Chart<TModel> chart)
            : base(chart)
        {
            Initialize();
        }

        /// <summary>
        /// A value indicating if the bars should be stacked.
        /// </summary>
        public bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        /// <value>
        /// A value of 1 means that there is a total of 1 column width / bar height between categories. 
        /// The distance is distributed evenly on each side.
        /// </value>
        public double? Gap
        {
            get;
            set;
        }

        /// <summary>
        /// Space between bars.
        /// </summary>
        /// <value>
        /// Value of 1 means that the distance between bars is equal to their width.
        /// </value>
        public double? Spacing
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the bars.
        /// </summary>
        /// <value>
        /// Can be either <see cref="ChartSeriesOrientation.Horizontal">horizontal</see> (bar chart)
        /// or <see cref="ChartSeriesOrientation.Vertical">vertical</see> (column chart).
        /// The default value is horizontal.
        /// </value>
        public ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the bar chart data labels configuration
        /// </summary>
        /// <returns></returns>
        public ChartBarLabels Labels
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the bar border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        public ChartBarSeriesOverlay Overlay
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer for the series
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartBarSeriesSerializer(this);
        }

        private void Initialize()
        {
            Orientation = ChartSeriesOrientation.Horizontal;
            Stacked = false;
            Labels = new ChartBarLabels();
            Border = new ChartElementBorder();
        }
    }
}