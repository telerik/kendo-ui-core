namespace Kendo.Mvc.UI
{
    public class ChartAxisTicks
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisTicks" /> class.
        /// </summary>
        public ChartAxisTicks()
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
        /// Gets or sets the ticks visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks step.
        /// </summary>
        public double? Step
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ticks skip.
        /// </summary>
        public double? Skip
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

        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisTicksSerializer(this);
        }
    }
}