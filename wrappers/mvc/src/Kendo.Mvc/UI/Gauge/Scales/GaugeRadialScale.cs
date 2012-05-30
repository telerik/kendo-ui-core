namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the radial scale.
    /// </summary>
    public class GaugeRadialScale : GaugeScaleBase, IRadialScale
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScale{T}" /> class.
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
        /// The scale labels.
        /// </summary>
        public GaugeRadialScaleLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer.
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new GaugeRadialScaleSerializer(this);
        }
    }
}