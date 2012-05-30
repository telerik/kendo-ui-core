namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the scale labels
    /// </summary>
    public class GaugeScaleLabelsBase : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleLabelsBase" /> class.
        /// </summary>
        public GaugeScaleLabelsBase()
        {
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new GaugeScaleLabelsSerializerBase(this);
        }
    }
}