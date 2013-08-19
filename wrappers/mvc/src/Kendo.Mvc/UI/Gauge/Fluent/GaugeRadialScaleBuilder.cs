using Kendo.Mvc.Infrastructure;
using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the gauge scale.
    /// </summary>
    public class GaugeRadialScaleBuilder : GaugeScaleBuilderBase<IRadialScale, GaugeRadialScaleBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref=GaugeRadialScaleBuilder" /> class.
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

        /// <summary>
        /// Configures the labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .Labels(labels => labels
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialScaleBuilder Labels(Action<GaugeRadialScaleLabelsBuilder> configurator)
        {
            configurator(new GaugeRadialScaleLabelsBuilder(Scale.Labels));

            return this;
        }

        /// <summary>
        /// Sets the width of the range indicators.
        /// </summary>
        /// <param name="theme">The width of the range indicators.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .RangeSize(4)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialScaleBuilder RangeSize(double size)
        {
            radialGauge.Scale.RangeSize = size;
            return this;
        }

        /// <summary>
        /// Sets the distance from the range indicators to the ticks.
        /// </summary>
        /// <param name="theme">The distance from the range indicators to the ticks.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .RangeDistance(4)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialScaleBuilder RangeDistance(double distance)
        {
            radialGauge.Scale.RangeDistance = distance;
            return this;
        }
    }
}