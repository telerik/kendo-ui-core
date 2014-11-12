namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="LinearGauge"/> component.
    /// </summary>
    public class LinearGaugeBuilder : WidgetBuilderBase<LinearGauge, LinearGaugeBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGaugeBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public LinearGaugeBuilder(LinearGauge component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the theme of the linear gauge.
        /// </summary>
        /// <param name="theme">The linear gauge theme.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Theme("Black")
        /// %&gt;
        /// </code>
        /// </example>
        public LinearGaugeBuilder Theme(string theme)
        {
            Component.Theme = theme;
            return this;
        }

        /// <summary>
        /// Sets the preferred rendering engine.
        /// If it is not supported by the browser, the Chart will switch to the first available mode.
        /// </summary>
        /// <param name="renderAs">The preferred rendering engine.</param>
        public LinearGaugeBuilder RenderAs(RenderingMode renderAs)
        {
            Component.RenderAs = renderAs;
            return this;
        }

        /// <summary>
        /// Sets the linear gauge area.
        /// </summary>
        /// <param name="configurator">The linear gauge area.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .ChartArea(chartArea => chartArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public LinearGaugeBuilder GaugeArea(Action<GaugeAreaBuilder> configurator)
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
        public LinearGaugeBuilder Scale(Action<GaugeLinearScaleBuilder> configurator)
        {

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
        public LinearGaugeBuilder Pointer(Action<GaugeLinearPointerBuilder> configurator)
        {

            configurator(new GaugeLinearPointerBuilder(Component.Pointer));

            return this;
        }

        /// <summary>
        /// Allows configuring multiple pointers
        /// </summary>
        /// <param name="configurator">The lambda which configures the pointers</param>
        /// <code lang="ASPX">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///     .Name("gauge")
        ///     .Pointers(pointer =>
        ///     {
        ///         pointer.Add().Value(10);
        ///         pointer.Add().Value(20).Shape(GaugeLinearPointerShape.Arrow);
        ///     })
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @(Html.Kendo().LinearGauge()
        ///     .Name("gauge")
        ///     .Pointers(pointer =>
        ///     {
        ///         pointer.Add().Value(10);
        ///         pointer.Add().Value(20).Shape(GaugeLinearPointerShape.Arrow);
        ///     })
        /// )
        /// </code>
        public LinearGaugeBuilder Pointers(Action<GaugeLinearPointerFactory> configurator)
        {
            GaugeLinearPointerFactory factory = new GaugeLinearPointerFactory(Component);

            configurator(factory);

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
        public LinearGaugeBuilder Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}