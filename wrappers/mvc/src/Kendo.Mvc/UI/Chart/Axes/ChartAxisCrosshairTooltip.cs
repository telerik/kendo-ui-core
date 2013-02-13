namespace Kendo.Mvc.UI
{
    public class ChartAxisCrosshairTooltip : ChartTooltip
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisCrosshairTooltip" /> class.
        /// </summary>
        public ChartAxisCrosshairTooltip()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisCrosshairTooltipSerializer(this);
        }
    }
}