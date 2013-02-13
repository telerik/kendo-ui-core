namespace Kendo.Mvc.UI
{
    public class ChartTooltip : ChartTooltipBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartTooltip" /> class.
        /// </summary>
        public ChartTooltip()
        {
        }

        public bool? Shared { get; set; }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartTooltipSerializer(this);
        }
    }
}