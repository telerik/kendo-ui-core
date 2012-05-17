namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the scale labels
    /// </summary>
    public class GaugeScaleLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleLabels" /> class.
        /// </summary>
        public GaugeScaleLabels()
        {
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new GaugeScaleLabelsSerializer(this);
        }
    }
}