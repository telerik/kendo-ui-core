namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="LinearGauge{T}"/> component.
    /// </summary>
    public class GaugeLinearBuilder<T> : ViewComponentBuilderBase<LinearGauge<T>, GaugeLinearBuilder<T>>, IHideObjectMembers
        where T : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GaugeLinearBuilder(LinearGauge<T> component)
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
        public GaugeLinearBuilder<T> Theme(string theme)
        {
            Component.Theme = theme;
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
        public GaugeLinearBuilder<T> GaugeArea(Action<GaugeAreaBuilder> configurator)
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
        public GaugeLinearBuilder<T> Scale(Action<GaugeLinearScaleBuilder<T>> configurator)
        {

            configurator(new GaugeLinearScaleBuilder<T>(Component));

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
        public GaugeLinearBuilder<T> Pointer(Action<GaugeLinearPointerBuilder<T>> configurator)
        {

            configurator(new GaugeLinearPointerBuilder<T>(Component.Pointer));

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
        public GaugeLinearBuilder<T> Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}