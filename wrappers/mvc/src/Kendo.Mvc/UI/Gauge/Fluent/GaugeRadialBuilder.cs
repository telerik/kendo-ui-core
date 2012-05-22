namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="RadialGauge{T}"/> component.
    /// </summary>
    public class GaugeRadialBuilder<T> : ViewComponentBuilderBase<RadialGauge<T>, GaugeRadialBuilder<T>>, IHideObjectMembers
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GaugeRadialBuilder(RadialGauge<T> component)
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
        public GaugeRadialBuilder<T> Theme(string theme)
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
        public GaugeRadialBuilder<T> GaugeArea(Action<GaugeAreaBuilder> configurator)
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
        public GaugeRadialBuilder<T> Scale(Action<GaugeRadialScaleBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeRadialScaleBuilder<T>(Component));

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
        public GaugeRadialBuilder<T> Pointer(Action<GaugeRadialPointerBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeRadialPointerBuilder<T>(Component.Pointer));

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
        public GaugeRadialBuilder<T> Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}