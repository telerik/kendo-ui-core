namespace Kendo.Mvc.UI
{
    public class ChartLegendLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLegendLabels" /> class.
        /// </summary>
        public ChartLegendLabels()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartLegendLabelsSerializer(this);
        }
    }
}