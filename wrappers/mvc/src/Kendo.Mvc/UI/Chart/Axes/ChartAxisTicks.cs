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

        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisTicksSerializer(this);
        }
    }
}