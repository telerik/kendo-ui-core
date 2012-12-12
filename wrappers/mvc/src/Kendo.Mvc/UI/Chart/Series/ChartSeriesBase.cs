namespace Kendo.Mvc.UI
{
    public abstract class ChartSeriesBase<T> : IChartSeries where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesBase{T}" /> class.
        /// </summary>
        protected ChartSeriesBase()
        {
            Tooltip = new ChartTooltip();
            Highlight = new ChartSeriesHighlight();
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
        /// Name template for auto-generated series when binding to grouped data.
        /// </summary>
        public string GroupNameTemplate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series highlight options
        /// </summary>
        public ChartSeriesHighlight Highlight
        {
            get;
            set;
        }

        public abstract IChartSerializer CreateSerializer();
    }
}