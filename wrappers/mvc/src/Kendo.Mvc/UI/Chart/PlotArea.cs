namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the plot area options
    /// </summary>
    public class PlotArea
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PlotArea" /> class.
        /// </summary>
        public PlotArea()
        {
            Margin = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the plot area background.
        /// </summary>
        /// <value>
        /// The plot area background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the plot area border.
        /// </summary>
        /// <value>
        /// The plot area border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the plot area margin.
        /// </summary>
        /// <value>
        /// The plot area margin.
        /// </value>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new PlotAreaSerializer(this);
        }
    }
}