namespace Kendo.Mvc.UI
{
    public class ChartFunnelLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelLabels" /> class.
        /// </summary>
        public ChartFunnelLabels()
        {
        }

        /// <summary>
        /// Defines the alignment of the funnel labels.
        /// </summary>
        public ChartFunnelLabelsAlign? Align
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the position of the funnel labels.
        /// </summary>
        public ChartFunnelLabelsPosition? Position
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartFunnelLabelsSerializer(this);
        }
    }
}