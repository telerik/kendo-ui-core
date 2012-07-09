namespace Kendo.Mvc.UI
{
    public class ChartPieLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPieLabels" /> class.
        /// </summary>
        public ChartPieLabels()
        {
        }

        /// <summary>
        /// Defines the alignment of the pie labels.
        /// </summary>
        public ChartPieLabelsAlign? Align
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the distance between the pie chart and labels.
        /// </summary>
        public int? Distance
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the position of the pie labels.
        /// </summary>
        public ChartPieLabelsPosition? Position
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPieLabelsSerializer(this);
        }
    }
}