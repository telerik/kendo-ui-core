namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="RadialGauge"/> component.
    /// </summary>
    public class RadialGaugeBuilder : WidgetBuilderBase<RadialGauge, RadialGaugeBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RadialGaugeBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public RadialGaugeBuilder(RadialGauge component)
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
        public RadialGaugeBuilder Theme(string theme)
        {
            Component.Theme = theme;
            return this;
        }

        /// <summary>
        /// Sets the preferred rendering engine.
        /// If it is not supported by the browser, the Chart will switch to the first available mode.
        /// </summary>
        /// <param name="renderAs">The preferred rendering engine.</param>
        public RadialGaugeBuilder RenderAs(RenderingMode renderAs)
        {
            Component.RenderAs = renderAs;
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
        public RadialGaugeBuilder GaugeArea(Action<GaugeAreaBuilder> configurator)
        {

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
        public RadialGaugeBuilder Scale(Action<GaugeRadialScaleBuilder> configurator)
        {

            configurator(new GaugeRadialScaleBuilder(Component));

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
        public RadialGaugeBuilder Pointer(Action<GaugeRadialPointerBuilder> configurator)
        {

            configurator(new GaugeRadialPointerBuilder(Component.Pointer));

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
        public RadialGaugeBuilder Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}