namespace Kendo.Mvc.UI
{
    public class GaugeScaleLabelsBase : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleLabelsBase" /> class.
        /// </summary>
        public GaugeScaleLabelsBase()
        {
        }

        public override IChartSerializer CreateSerializer()
        {
            return new GaugeScaleLabelsSerializerBase(this);
        }
    }
}