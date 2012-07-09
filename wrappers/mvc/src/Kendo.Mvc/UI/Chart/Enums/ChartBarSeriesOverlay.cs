namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the available bar series effects overlays
    /// </summary>
    public sealed class ChartBarSeriesOverlay
    {
        public ChartBarGradient Gradient
        {
            get;
            private set;
        }

        /// <summary>
        /// The bars have no effect overlay
        /// </summary>
        public static readonly ChartBarSeriesOverlay None =
            new ChartBarSeriesOverlay(ChartBarGradient.None);

        /// <summary>
        /// The bars have glass effect overlay
        /// </summary>
        public static readonly ChartBarSeriesOverlay Glass =
            new ChartBarSeriesOverlay(ChartBarGradient.Glass);

        private ChartBarSeriesOverlay(ChartBarGradient gradient)
        {
            Gradient = gradient;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartBarSeriesOverlaySerializer(this);
        }
    }
}
