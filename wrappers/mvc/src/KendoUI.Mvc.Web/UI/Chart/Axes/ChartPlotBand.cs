namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the options of the axis plot band
    /// </summary>
    public class ChartPlotBand
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPlotBand" /> class.
        /// </summary>
        public ChartPlotBand()
        {
        }

        /// <summary>
        /// Gets or sets the plot band start position.
        /// </summary>
        /// <value>
        /// The start position of the plot band.
        /// </value>
        public decimal? From
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the plot band end position.
        /// </summary>
        /// <value>
        /// The end position of the plot band.
        /// </value>
        public decimal? To
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the plot band background color.
        /// </summary>
        /// <value>
        /// The plot band background color.
        /// </value>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the plot band opacity.
        /// </summary>
        /// <value>
        /// The plot band opacity.
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartPlotBandsSerializer(this);
        }
    }
}