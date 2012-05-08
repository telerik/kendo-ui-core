namespace KendoUI.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the linear gauge track.
    /// </summary>
    public class LinearGaugeTrackBuilder : IHideObjectMembers
    {
        private readonly LinearGaugeTrack track;

        /// <summary>
        /// Initializes a new instance of the <see cref="LinearGaugeTrackBuilder" /> class.
        /// </summary>
        /// <param name="chartBarLabels">The data labels configuration.</param>
        public LinearGaugeTrackBuilder(LinearGaugeTrack linearGaugeTrack)
        {
            track = linearGaugeTrack;
        }

        /// <summary>
        /// Sets the track color.
        /// </summary>
        /// <param name="color">The track color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Track(track => track.Color("red"))
        ///           )        
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public LinearGaugeTrackBuilder Color(string color)
        {
            track.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the track size.
        /// </summary>
        /// <param name="size">The track size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Track(track => track.Size(8))
        ///           )         
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public LinearGaugeTrackBuilder Size(double size)
        {
            track.Size = size;
            return this;
        }

        /// <summary>
        /// Sets the track visibility.
        /// </summary>
        /// <param name="visible">The track visibility.</param>
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
        public LinearGaugeTrackBuilder Visible(bool visible)
        {
            track.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the track border.
        /// </summary>
        /// <param name="width">The pointer border width.</param>
        /// <param name="color">The pointer border color.</param>
        /// <param name="dashType">The pointer dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Pointer(pointer => pointer
        ///               .Track(track => track.Border(1, "#000", ChartDashType.Dot))
        ///           )         
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public LinearGaugeTrackBuilder Border(int width, string color, ChartDashType dashType)
        {
            track.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }
    }
}