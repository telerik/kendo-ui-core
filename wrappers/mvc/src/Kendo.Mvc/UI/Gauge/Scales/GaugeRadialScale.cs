namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the radial scale.
    /// </summary>
    public class GaugeRadialScale<T> : GaugeScaleBase<T>, IRadialScale<T> where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScale{T}" /> class.
        /// </summary>
        /// <value>The radial gauge.</value>
        public GaugeRadialScale(RadialGauge<T> gauge)
            : base()
        {
            radialGauge = gauge;
        }

        /// <summary>
        /// Gets or sets the radial gauge.
        /// </summary>
        /// <value>The radial gauge.</value>
        public RadialGauge<T> radialGauge
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
        /// Creates a serializer.
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new GaugeRadialScaleSerializer<T>(this);
        }
    }
}