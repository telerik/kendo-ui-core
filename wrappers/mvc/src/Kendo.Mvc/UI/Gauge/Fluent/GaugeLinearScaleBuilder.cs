using System;
using Kendo.Mvc.Infrastructure;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the gauge scale.
    /// </summary>
    public class GaugeLinearScaleBuilder<T> : GaugeScaleBuilderBase<ILinearScale<T>, GaugeLinearScaleBuilder<T>, T>
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearScaleBuilder{T}" /> class.
        /// </summary>
        /// <param name="gauge">The gauge component.</param>
        public GaugeLinearScaleBuilder(LinearGauge<T> gauge)
            : base(gauge.Scale)
        {
            linearGauge = gauge;
        }

        /// <summary>
        /// The parent Guage
        /// </summary>
        public LinearGauge<T> linearGauge
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
        public GaugeLinearScaleBuilder<T> Mirror(bool mirror)
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
        public GaugeLinearScaleBuilder<T> Vertical(bool vertical)
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
        public GaugeLinearScaleBuilder<T> Labels(Action<GaugeLinearScaleLabelsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeLinearScaleLabelsBuilder(Scale.Labels));

            return this;
        }
    }
}