namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public abstract class ChartAxisBase<T, TValue> : IChartAxis<TValue>
        where T : class
        where TValue : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisBase{T, TValue}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAxisBase(Chart<T> chart)
        {
            Chart = chart;
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            Line = new ChartLine();
            Labels = new ChartAxisLabels();
            PlotBands = new List<ChartPlotBand<TValue>>();
            Title = new ChartAxisTitle();
            MajorTicks = new ChartAxisTicks();
            MinorTicks = new ChartAxisTicks();
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
        /// The axis major ticks configuration.
        /// </summary>
        public ChartAxisTicks MajorTicks
        {
            get;
            set;
        }

        /// <summary>
        /// The axis minor ticks configuration.
        /// </summary>
        public ChartAxisTicks MinorTicks
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
        public IList<ChartPlotBand<TValue>> PlotBands
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
        /// The name of the pane that the axis should be rendered in.
        /// </summary>
        public string Pane
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
        /// A value indicating if the automatic axis range should snap to 0.
        /// </summary>
        public bool? NarrowRange
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        public abstract IChartSerializer CreateSerializer();
    }
}