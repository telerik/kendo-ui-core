namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the gauge scale ticks.
    /// </summary>
    public class GaugeScaleTicks
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleTicks" /> class.
        /// </summary>
        public GaugeScaleTicks()
        {
        }

        /// <summary>
        /// Gets or sets the tick size.
        /// </summary>
        public int? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tick width.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tick color.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tick dash type.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tick dash visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new GaugeScaleTicksSerializer(this);
        }
    }
}