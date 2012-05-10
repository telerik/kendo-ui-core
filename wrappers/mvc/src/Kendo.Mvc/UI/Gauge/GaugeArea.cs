namespace Kendo.Mvc.UI
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
        /// Gets or sets the gauge area background.
        /// </summary>
        /// <value>
        /// The gauge area background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the gauge area border.
        /// </summary>
        /// <value>
        /// The gauge area border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the gauge area margin.
        /// </summary>
        /// <value>
        /// The gauge area margin.
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
            return new GaugeAreaSerializer(this);
        }
    }
}