namespace Kendo.Mvc.UI
{
    public class ChartAxisCrosshair : ChartLineBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisCrosshair" /> class.
        /// </summary>
        public ChartAxisCrosshair()
        {
            Tooltip = new ChartAxisCrosshairTooltip();
        }

        /// <summary>
        /// The tooltip of the crosshair.
        /// </summary>
        public ChartAxisCrosshairTooltip Tooltip
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisCrosshairSerializer(this);
        }
    }
}