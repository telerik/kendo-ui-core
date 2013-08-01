namespace Kendo.Mvc.UI
{
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
        /// Gets or sets the plot area opacity.
        /// </summary>
        /// <value>A value between 0 (transparent) and 1 (opaque).</value>
        public double? Opacity
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

        public IChartSerializer CreateSerializer()
        {
            return new PlotAreaSerializer(this);
        }
    }
}