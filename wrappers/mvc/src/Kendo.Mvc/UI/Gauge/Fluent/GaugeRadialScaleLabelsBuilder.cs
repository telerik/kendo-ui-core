namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the radial gauge labels.
    /// </summary>
    public class GaugeRadialScaleLabelsBuilder : GaugeLabelsBuilder<GaugeRadialScaleLabelsBuilder>
    {
        private GaugeRadialScaleLabels labels;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScaleLabelsBuilder" /> class.
        /// </summary>
        /// <param name="GaugeRadialScaleLabels">The labels configuration.</param>
        public GaugeRadialScaleLabelsBuilder(GaugeRadialScaleLabels ScaleLabels)
            : base(ScaleLabels)
        {
            labels = ScaleLabels;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="position">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => scale
        ///                .Labels(labels => labels
        ///                    .Position(GaugeRadialScaleLabelsPosition.Inside)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeRadialScaleLabelsBuilder Position(GaugeRadialScaleLabelsPosition Position)
        {
            labels.Position = Position;
            return this;
        }
    }
}