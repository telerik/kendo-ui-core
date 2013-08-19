namespace Kendo.Mvc.UI
{
    public class GaugeRadialScale : GaugeScaleBase, IRadialScale
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScale" /> class.
        /// </summary>
        /// <value>The radial gauge.</value>
        public GaugeRadialScale(RadialGauge gauge)
            : base()
        {
            Labels = new GaugeRadialScaleLabels();
            radialGauge = gauge;
        }

        /// <summary>
        /// Gets or sets the radial gauge.
        /// </summary>
        /// <value>The radial gauge.</value>
        public RadialGauge radialGauge
        {
            get;
            private set;
        }

        /// <summary>
        /// The scale end angle.
        /// </summary>
        public double? EndAngle
        {
            get;
            set;
        }

        /// <summary>
        /// The scale start angle.
        /// </summary>
        public double? StartAngle
        {
            get;
            set;
        }

        /// <summary>
        /// The width of the range indicators
        /// </summary>
        public double? RangeSize
        {
            get;
            set;
        }

        /// <summary>
        /// The distance from the range indicators to the ticks
        /// </summary>
        public double? RangeDistance
        {
            get;
            set;
        }

        /// <summary>
        /// The scale labels.
        /// </summary>
        public GaugeRadialScaleLabels Labels
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new GaugeRadialScaleSerializer(this);
        }
    }
}