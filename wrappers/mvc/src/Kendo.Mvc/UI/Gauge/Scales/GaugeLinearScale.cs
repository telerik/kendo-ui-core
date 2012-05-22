namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the linear scale.
    /// </summary>
    public class GaugeLinearScale<T> : GaugeScaleBase<T>, ILinearScale<T> where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearScale" /> class.
        /// </summary>
        /// <value>The linear gauge.</value>
        public GaugeLinearScale(LinearGauge<T> gauge)
            : base()
        {
            lienarGauge = gauge;
        }

        /// <summary>
        /// Gets or sets the linear gauge.
        /// </summary>
        /// <value>The linear gauge.</value>
        public LinearGauge<T> lienarGauge
        {
            get;
            private set;
        }

        /// <summary>
        /// The scale mirror.
        /// </summary>
        public bool? Mirror
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new GaugeLinearScaleSerializer<T>(this);
        }
    }
}