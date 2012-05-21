namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the gauge scale.
    /// </summary>
    public class GaugeRadialScaleBuilder : GaugeScaleBuilderBase<IRadialScale, GaugeRadialScaleBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialScaleBuilder" /> class.
        /// </summary>
        /// <param name="gauge">The gauge component.</param>
        public GaugeRadialScaleBuilder(RadialGauge gauge)
            : base(gauge.Scale)
        {
            radialGauge = gauge;
        }

        /// <summary>
        /// The parent Guage
        /// </summary>
        public RadialGauge radialGauge
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the end angle of the gauge
        /// </summary>
        /// <param name="endAngle">The end angle.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .EndAngle(10)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeRadialScaleBuilder EndAngle(double endAngle)
        {
            radialGauge.Scale.EndAngle = endAngle;
            return this;
        }

        /// <summary>
        /// Sets the start angle of the gauge
        /// </summary>
        /// <param name="startAngle">The start Angle.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .StartAngle(220)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeRadialScaleBuilder StartAngle(double startAngle)
        {
            radialGauge.Scale.StartAngle = startAngle;
            return this;
        }
    }
}