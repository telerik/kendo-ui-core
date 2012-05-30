namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;

    /// <summary>
    /// Represents chart area series
    /// </summary>
    /// <typeparam name="TModel">The Chart model type</typeparam>
    /// <typeparam name="TValue">The value type</typeparam>
    public class ChartAreaSeries<TModel, TValue> : ChartBoundSeries<TModel, TValue>, IChartAreaSeries where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The parent chart</param>
        /// <param name="expression">The expression used to extract the series value from the chart model.</param>
        public ChartAreaSeries(Chart<TModel> chart, Expression<Func<TModel, TValue>> expression)
            : base(chart, expression)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The parent chart</param>
        /// <param name="data">The data to bind to.</param>
        public ChartAreaSeries(Chart<TModel> chart, IEnumerable data)
            : base(chart, data)
        {
            Initialize();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeries{TModel, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAreaSeries(Chart<TModel> chart)
            : base(chart)
        {
            Initialize();
        }

        /// <summary>
        /// A value indicating if the areas should be stacked.
        /// </summary>
        public bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the area chart data labels configuration.
        /// </summary>
        public ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The area chart markers configuration.
        /// </summary>
        public ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in area series.
        /// </summary>
        public ChartAreaMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The area chart line configuration.
        /// </summary>
        public ChartLine Line
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the area chart.
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

        /// <summary>
        /// Creates a serializer for the series
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartAreaSeriesSerializer(this);
        }

        private void Initialize()
        {
            Stacked = false;
            Labels = new ChartPointLabels();
            Markers = new ChartMarkers();
            Line = new ChartLine();
            Orientation = ChartSeriesOrientation.Horizontal;
        }
    }
}