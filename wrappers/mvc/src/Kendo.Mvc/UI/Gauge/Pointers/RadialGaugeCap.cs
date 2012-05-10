namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the gauge cap
    /// </summary>
    public class RadialGaugeCap
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RadialGaugeCap" /> class.
        /// </summary>
        public RadialGaugeCap()
        {
        }

        /// <summary>
        /// Gets or sets cap color
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the cap opacity
        /// </summary>
        /// <value>
        /// The cap opacity
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the cap size in percents
        /// </summary>
        /// <value>
        /// The cap size in percents
        /// </value>
        public double? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new RadialGaugeCapSerializer(this);
        }
    }
}