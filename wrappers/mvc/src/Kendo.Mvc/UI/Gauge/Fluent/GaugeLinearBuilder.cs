namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="LinearGauge"/> component.
    /// </summary>
    public class GaugeLinearBuilder : ViewComponentBuilderBase<LinearGauge, GaugeLinearBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GaugeLinearBuilder(LinearGauge component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the theme of the radial gauge.
        /// </summary>
        /// <param name="theme">The radial gauge theme.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Theme("Black")
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearBuilder Theme(string theme)
        {
            Component.Theme = theme;
            return this;
        }

        /// <summary>
        /// Sets the radial gauge area.
        /// </summary>
        /// <param name="configurator">The radial gauge area.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .ChartArea(chartArea => chartArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearBuilder GaugeArea(Action<GaugeAreaBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeAreaBuilder(Component.GaugeArea));
            return this;
        }

        /// <summary>
        /// Configures the scale
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Scale(scale => scale
        ///                .Min(10)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearBuilder Scale(Action<GaugeLinearScaleBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeLinearScaleBuilder(Component));

            return this;
        }

        /// <summary>
        /// Configures the pointer
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Pointer(pointer => pointer
        ///                .Value(10)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearBuilder Pointer(Action<GaugeLinearPointerBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeLinearPointerBuilder(Component.Pointer));

            return this;
        }

        /// <summary>
        /// Enables or disabled animated transitions on initial load and refresh. 
        /// </summary>
        /// <param name="transitions">
        /// A value indicating if transition animations should be played.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialScale")
        ///            .Transitions(false)
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearBuilder Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}