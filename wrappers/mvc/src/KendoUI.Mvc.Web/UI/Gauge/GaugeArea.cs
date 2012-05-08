namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the Chart area options
    /// </summary>
    public class GaugeArea
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeArea" /> class.
        /// </summary>
        public GaugeArea()
        {
            Margin = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the Gauge area background.
        /// </summary>
        /// <value>
        /// The Gauge area background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Gauge area border.
        /// </summary>
        /// <value>
        /// The Gauge area border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Gauge area margin.
        /// </summary>
        /// <value>
        /// The Chart area margin.
        /// </value>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Gauge area width.
        /// </summary>
        /// <value>
        /// The Chart area width.
        /// </value>
        public double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Gauge area height.
        /// </summary>
        /// <value>
        /// The Chart area height.
        /// </value>
        public double? Height
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new GaugeAreaSerializer(this);
        }
    }
}