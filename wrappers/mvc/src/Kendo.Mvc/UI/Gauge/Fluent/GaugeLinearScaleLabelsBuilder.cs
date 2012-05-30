namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the linear gauge labels.
    /// </summary>
    public class GaugeLinearScaleLabelsBuilder : GaugeLabelsBuilder<GaugeLinearScaleLabelsBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearScaleLabelsBuilder" /> class.
        /// </summary>
        /// <param name="GaugeLinearScaleLabels">The labels configuration.</param>
        public GaugeLinearScaleLabelsBuilder(GaugeLinearScaleLabels ScaleLabels)
            : base(ScaleLabels)
        {
        }
    }
}