namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    public class ChartLineSeries<TModel, TValue> : ChartBoundSeries<TModel, TValue>, IChartLineSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="expression">The expression used to extract the series value from the chart model.</param>
        public ChartLineSeries(Expression<Func<TModel, TValue>> expression)
            : base(expression)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue}"/> class.
        /// </summary>
        /// <param name="data">The data to bind to.</param>
        public ChartLineSeries(IEnumerable data)
            : base(data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeries{TModel, TValue}" /> class.
        /// </summary>
        public ChartLineSeries()
            : base()
        {
            Initialize();
        }

        /// <summary>
        /// A value indicating if the lines should be stacked.
        /// </summary>
        public bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// Aggregate function for date series.
        /// </summary>
        public ChartSeriesAggregate? Aggregate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the line chart data labels configuration
        /// </summary>
        public ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart markers configuration.
        /// </summary>
        public ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart line width.
        /// </summary>
        public double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in line series.
        /// </summary>
        public ChartLineMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart line dashType.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the line.
        /// </summary>
        /// <value>
        /// Can be either <see cref="ChartSeriesOrientation.Horizontal">horizontal</see>
        /// or <see cref="ChartSeriesOrientation.Vertical">vertical</see>.
        /// The default value is horizontal.
        /// </value>
        public ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartLineSeriesSerializer(this);
        }

        private void Initialize()
        {
            Stacked = false;
            Labels = new ChartPointLabels();
            Markers = new ChartMarkers();
            Orientation = ChartSeriesOrientation.Horizontal;
        }
    }
}