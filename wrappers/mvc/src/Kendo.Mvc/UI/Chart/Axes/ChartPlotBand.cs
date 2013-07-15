namespace Kendo.Mvc.UI
{
    public class ChartPlotBand
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPlotBand{T}" /> class.
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
        public double? From
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
        public double? To
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

        public IChartSerializer CreateSerializer()
        {
            return new ChartPlotBandsSerializer(this);
        }
    }
}