namespace Kendo.Mvc.UI
{
    public class GaugeScaleTicks
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleTicks" /> class.
        /// </summary>
        public GaugeScaleTicks()
        {
        }

        /// <summary>
        /// Gets or sets the ticks size.
        /// </summary>
        public int? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks width.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks color.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks dash type.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }


        public IChartSerializer CreateSerializer()
        {
            return new GaugeScaleTicksSerializer(this);
        }
    }
}