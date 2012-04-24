namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents a chart axis base.
    /// </summary>
    public abstract class ChartAxisBase<T> : IChartAxis where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisBase{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAxisBase(Chart<T> chart)
        {
            Chart = chart;
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            Line = new ChartLine();
            Labels = new ChartAxisLabels();
            PlotBands = new List<ChartPlotBand>();
            Title = new ChartAxisTitle();
            AxisCrossingValues = new List<double>();
        }

        /// <summary>
        /// Gets or sets the chart.
        /// </summary>
        /// <value>The chart.</value>
        public Chart<T> Chart
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the minor tick size. The default is 3.
        /// </summary>
        public int? MinorTickSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the major tick size. The default is 4.
        /// </summary>
        public int? MajorTickSize
        {
            get;
            set;
        }

        /// <summary>
        /// The major tick type. The default is <see cref="ChartAxisTickType.Outside"/>.
        /// </summary>
        public ChartAxisTickType? MajorTickType
        {
            get;
            set;
        }

        /// <summary>
        /// The minor tick type. The default is <see cref="ChartAxisTickType.None"/>.
        /// </summary>
        public ChartAxisTickType? MinorTickType
        {
            get;
            set;
        }

        /// <summary>
        /// The major grid lines configuration.
        /// </summary>
        public ChartLine MajorGridLines
        {
            get;
            set;
        }

        /// <summary>
        /// The minor grid lines configuration.
        /// </summary>
        public ChartLine MinorGridLines
        {
            get;
            set;
        }

        /// <summary>
        /// The axis line configuration.
        /// </summary>
        public ChartLine Line
        {
            get;
            set;
        }

        /// <summary>
        /// The values at which perpendicular axes cross this axis.
        /// </summary>
        public IEnumerable<double> AxisCrossingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The axis labels.
        /// </summary>
        public ChartAxisLabels Labels 
        { 
            get; 
            set; 
        }

        /// <summary>
        /// The axis plot bands.
        /// </summary>
        public IList<ChartPlotBand> PlotBands
        {
            get;
            set;
        }

        /// <summary>
        /// The axis title.
        /// </summary>
        public ChartAxisTitle Title
        {
            get;
            set;
        }

        /// <summary>
        /// The axis name. Leave empty to use the "primary" default value.
        /// </summary>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// The color for all axis elements. Can be overriden by individual settings.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// A value indicating if the axis labels should be rendered in reverse.
        /// </summary>
        public bool? Reverse
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the axis serializer.
        /// </summary>
        public abstract IChartSerializer CreateSerializer();
    }
}