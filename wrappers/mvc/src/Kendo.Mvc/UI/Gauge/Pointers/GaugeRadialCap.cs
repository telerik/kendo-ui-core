namespace Kendo.Mvc.UI
{
    public class GaugeRadialCap
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialCap" /> class.
        /// </summary>
        public GaugeRadialCap()
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

        public IChartSerializer CreateSerializer()
        {
            return new GaugeRadialCapSerializer(this);
        }
    }
}