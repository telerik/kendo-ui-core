

namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents a series in the <see cref="KendoUI.Mvc.UI.Chart{T}"/> component
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public abstract class ChartSeriesBase<T> : IChartSeries where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesBase{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        protected ChartSeriesBase(Chart<T> chart)
        {
            Chart = chart;
            Tooltip = new ChartTooltip();
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
        /// Gets or sets the title of the series.
        /// </summary>
        /// <value>The title.</value>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series opacity.
        /// </summary>
        /// <value>A value between 0 (transparent) and 1 (opaque).</value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series base color
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the data point tooltip options
        /// </summary>
        public ChartTooltip Tooltip
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the axis name to use for this series.
        /// </summary>
        /// <value>The axis name.</value>
        public string Axis
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer for the series
        /// </summary>
        public abstract IChartSerializer CreateSerializer();
    }
}