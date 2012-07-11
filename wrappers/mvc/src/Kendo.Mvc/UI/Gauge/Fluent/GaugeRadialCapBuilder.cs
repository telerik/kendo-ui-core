namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="GaugeRadialCapBuilder"/>.
    /// </summary>
    public class GaugeRadialCapBuilder : IHideObjectMembers
    {
        private readonly GaugeRadialCap cap;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeRadialCapBuilder" /> class.
        /// </summary>
        /// <param name="cap">The gauge cap.</param>
        public GaugeRadialCapBuilder(GaugeRadialCap cap)
        {
            this.cap = cap;
        }

        /// <summary>
        /// Sets the cap color.
        /// </summary>
        /// <param name="color">The cap color.</param>
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
        public GaugeRadialCapBuilder Color(string color)
        {
            cap.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the cap opacity.
        /// </summary>
        /// <param name="opacity">
        /// The cap opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Cap(cap => cap.Opacity(0.5))
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialCapBuilder Opacity(double opacity)
        {
            cap.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Sets the cap size in percents.
        /// </summary>
        /// <param name="size">The cap size in percents.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().RadialGauge()
        ///           .Name("radialGauge")
        ///           .Pointer(pointer => pointer
        ///               .Cap(cap => cap.Size(8))
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeRadialCapBuilder Size(double size)
        {
            cap.Size = size;
            return this;
        }
    }
}