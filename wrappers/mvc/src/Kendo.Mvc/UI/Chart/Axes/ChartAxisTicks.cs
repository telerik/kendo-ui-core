namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the chart axis ticks.
    /// </summary>
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
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisTicksSerializer(this);
        }
    }
}