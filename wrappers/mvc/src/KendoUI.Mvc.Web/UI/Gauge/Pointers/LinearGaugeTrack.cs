namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the gauge track
    /// </summary>
    public class LinearGaugeTrack
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGaugeTrack" /> class.
        /// </summary>
        public LinearGaugeTrack()
        {
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets track color
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the track border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the track size
        /// </summary>
        /// <value>
        /// The track size
        /// </value>
        public double? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the visibility of the track
        /// </summary>
        /// <value>
        /// The track visibility
        /// </value>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the track opacity
        /// </summary>
        /// <value>
        /// The track opacity
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
            return new LinearGaugeTrackSerializer(this);
        }
    }
}