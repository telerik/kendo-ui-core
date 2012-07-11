using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the gauge scale.
    /// </summary>
    public class GaugeLinearScaleBuilder : GaugeScaleBuilderBase<ILinearScale, GaugeLinearScaleBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearScaleBuilder" /> class.
        /// </summary>
        /// <param name="gauge">The gauge component.</param>
        public GaugeLinearScaleBuilder(LinearGauge gauge)
            : base(gauge.Scale)
        {
            linearGauge = gauge;
        }

        /// <summary>
        /// The parent Guage
        /// </summary>
        public LinearGauge linearGauge
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the mirror of the gauge
        /// </summary>
        /// <param name="mirror">The mirror.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("LinearGauge")
        ///            .Scale(scale => scale
        ///                .Mirror(true)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearScaleBuilder Mirror(bool mirror)
        {
            linearGauge.Scale.Mirror = mirror;
            return this;
        }

        /// <summary>
        /// Sets the orientation of the gauge
        /// </summary>
        /// <param name="vertical">The vertical.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("LinearGauge")
        ///            .Scale(scale => scale
        ///                .Vertical(false)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearScaleBuilder Vertical(bool vertical)
        {
            linearGauge.Scale.Vertical = vertical;
            return this;
        }

        /// <summary>
        /// Configures the labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        ///            .Scale(scale => scale
        ///                .Labels(labels => labels
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearScaleBuilder Labels(Action<GaugeLinearScaleLabelsBuilder> configurator)
        {

            configurator(new GaugeLinearScaleLabelsBuilder(Scale.Labels));

            return this;
        }
    }
}