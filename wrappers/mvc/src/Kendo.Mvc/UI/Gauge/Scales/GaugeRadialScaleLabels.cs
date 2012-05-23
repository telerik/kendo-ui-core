namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the linear scale labels
    /// </summary>
    public class GaugeRadialScaleLabels : GaugeScaleLabelsBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScaleLabels" /> class.
        /// </summary>
        public GaugeRadialScaleLabels()
        {
        }

        /// <summary>
        /// The radila scale lables position.
        /// </summary>
        public GaugeRadialScaleLabelsPosition? Position
        {
            get;
            set;
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