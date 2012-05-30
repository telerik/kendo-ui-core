namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the available pie series effects overlays
    /// </summary>
    public sealed class ChartPieSeriesOverlay
    {
        private readonly object value;

        public object Value
        {
            get
            {
                return value;
            }
        }

        /// <summary>
        /// The pies have no effect overlay
        /// </summary>
        public static readonly ChartPieSeriesOverlay None =
            new ChartPieSeriesOverlay(null);

        /// <summary>
        /// The pie segments have sharp bevel effect overlay
        /// </summary>
        public static readonly ChartPieSeriesOverlay SharpBevel =
            new ChartPieSeriesOverlay(new { gradient = "sharpBevel" });

        /// <summary>
        /// The pie segments have sharp bevel effect overlay
        /// </summary>
        public static readonly ChartPieSeriesOverlay RoundedBevel =
            new ChartPieSeriesOverlay(new { gradient = "roundedBevel" });

        private ChartPieSeriesOverlay(object value)
        {
            this.value = value;
        }
    }
}