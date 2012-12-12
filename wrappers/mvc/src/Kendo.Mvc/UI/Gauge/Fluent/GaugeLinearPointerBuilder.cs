namespace Kendo.Mvc.UI.Fluent
{
    using System;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="GaugeLinearPointerBuilder"/>.
    /// </summary>
    public class GaugeLinearPointerBuilder : IHideObjectMembers
    {
        private readonly GaugeLinearPointer pointer;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearPointerBuilder" /> class.
        /// </summary>
        /// <param name="pointer">The gauge pointer.</param>
        public GaugeLinearPointerBuilder(GaugeLinearPointer pointer)
        {
            this.pointer = pointer;
        }

        /// <summary>
        /// Sets the pointer color.
        /// </summary>
        /// <param name="color">The pointer color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Color("red")
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearPointerBuilder Color(string color)
        {
            pointer.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the pointer shape.
        /// </summary>
        /// <param name="shape">The pointer shape.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Shape(LinearGaugePointerShape.Arrow)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearPointerBuilder Shape(GaugeLinearPointerShape shape)
        {
            pointer.Shape = shape;
            return this;
        }

        /// <summary>
        /// Sets the pointer margin.
        /// </summary>
        /// <param name="top">The pointer top margin.</param>
        /// <param name="right">The pointer right margin.</param>
        /// <param name="bottom">The pointer bottom margin.</param>
        /// <param name="left">The pointer left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Margin(20, 20, 20, 20)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearPointerBuilder Margin(int top, int right, int bottom, int left)
        {
            pointer.Margin.Top = top;
            pointer.Margin.Right = right;
            pointer.Margin.Bottom = bottom;
            pointer.Margin.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the pointer margin.
        /// </summary>
        /// <param name="margin">The pointer margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Margin(20)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearPointerBuilder Margin(int margin)
        {
            pointer.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the pointer border
        /// </summary>
        /// <param name="width">The pointer border width.</param>
        /// <param name="color">The pointer border color.</param>
        /// <param name="dashType">The pointer dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Border(1, "#000", ChartDashType.Dot)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLinearPointerBuilder Border(int width, string color, ChartDashType dashType)
        {
            pointer.Border = new ChartElementBorder(width, color, dashType);
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
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Opacity(0.5)
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearPointerBuilder Opacity(double opacity)
        {
            pointer.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Sets the pointer size.
        /// </summary>
        /// <param name="size">The pointer size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Size(8)
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearPointerBuilder Size(double size)
        {
            pointer.Size = size;
            return this;
        }

        /// <summary>
        /// Sets the pointer value.
        /// </summary>
        /// <param name="value">The pointer value.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Value(25)
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearPointerBuilder Value(double value)
        {
            pointer.Value = value;
            return this;
        }

        /// <summary>
        /// Configures the pointer track.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Track(track => track.Visible(true))
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeLinearPointerBuilder Track(Action<GaugeLinearTrackBuilder> configurator)
        {

            configurator(new GaugeLinearTrackBuilder(pointer.Track));

            return this;
        }
    }
}