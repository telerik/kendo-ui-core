namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the gauge pointer
    /// </summary>
    public class GaugeRadialPointer
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialPointer" /> class.
        /// </summary>
        public GaugeRadialPointer()
        {
            Cap = new GaugeRadialCap();
        }

        /// <summary>
        /// Gets or sets pointer color
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pointer opacity
        /// </summary>
        /// <value>
        /// The pointer opacity
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pointer value
        /// </summary>
        /// <value>
        /// The pointer value
        /// </value>
        public double? Value
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pointer value
        /// </summary>
        /// <value>
        /// The pointer value
        /// </value>
        public GaugeRadialCap Cap
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new GaugeRadialPointerSerializer(this);
        }
    }
}