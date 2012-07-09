namespace Kendo.Mvc.UI
{
    public class GaugeLinearScaleLabels : GaugeScaleLabelsBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearScaleLabels" /> class.
        /// </summary>
        public GaugeLinearScaleLabels()
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