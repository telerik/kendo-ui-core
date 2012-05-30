namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the gauge pointer
    /// </summary>
    public class GaugeLinearPointer<T> where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearPointer<T>" /> class.
        /// </summary>
        public GaugeLinearPointer()
        {
            Margin = new ChartSpacing();
            Border = new ChartElementBorder();
            Track = new GaugeLinearTrack();
        }

        /// <summary>
        /// Gets or sets the pointer margin
        /// </summary>
        public ChartSpacing Margin
        {
            get;
            set;
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
        /// Gets or sets the pointer border
        /// </summary>
        public ChartElementBorder Border
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
        /// Gets or sets the pointer shape
        /// </summary>
        /// <value>
        /// The pointer shape
        /// </value>
        public GaugeLinearPointerShape? Shape
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pointer size
        /// </summary>
        /// <value>
        /// The pointer size
        /// </value>
        public double? Size
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
        public T? Value
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pointer position
        /// </summary>
        /// <value>
        /// The pointer position
        /// </value>
        public GaugeLinearTrack Track
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new GaugeLinearPointerSerializer<T>(this);
        }
    }
}