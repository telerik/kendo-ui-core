namespace Kendo.Mvc.UI
{
    public class ChartRangeBarLabels : ChartBarLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRangeBarLabels" /> class.
        /// </summary>
        public ChartRangeBarLabels()
        {
            From = new ChartBarLabels();
            To = new ChartBarLabels();
        }

        /// <summary>
        /// Defines the from label
        /// </summary>
        public ChartBarLabels From { get; set; }

        /// <summary>
        /// Defines the to label
        /// </summary>
        public ChartBarLabels To { get; set; }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRangeBarLabelsSerializer(this);
        }
    }
}
