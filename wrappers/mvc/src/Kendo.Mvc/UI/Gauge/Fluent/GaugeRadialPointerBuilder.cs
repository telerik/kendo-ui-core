using System;
using Kendo.Mvc.Infrastructure;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="GaugeRadialPointer<T>"/>.
    /// </summary>
    public class GaugeRadialPointerBuilder<T> : IHideObjectMembers
         where T : struct
    {
        private readonly GaugeRadialPointer<T> pointer;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialPointerBuilder<T>" /> class.
        /// </summary>
        /// <param name="pointer">The gauge pointer.</param>
        public GaugeRadialPointerBuilder(GaugeRadialPointer<T> pointer)
        {
            this.pointer = pointer;
        }

        /// <summary>
        /// Sets the pointer color.
        /// </summary>
        /// <param name="color">The pointer color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Color("red")
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeRadialPointerBuilder<T> Color(string color)
        {
            pointer.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the pointer opacity.
        /// </summary>
        /// <param name="opacity">
        /// The pointer opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Opacity(0.5)
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialPointerBuilder<T> Opacity(double opacity)
        {
            pointer.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Sets the pointer value.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Value(25)
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialPointerBuilder<T> Value(T value)
        {
            pointer.Value = value;
            return this;
        }

        /// <summary>
        /// Configures the pointer cap.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Cap(cap => cap.Color("red"))
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialPointerBuilder<T> Cap(Action<GaugeRadialCapBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GaugeRadialCapBuilder(pointer.Cap));

            return this;
        }
    }
}