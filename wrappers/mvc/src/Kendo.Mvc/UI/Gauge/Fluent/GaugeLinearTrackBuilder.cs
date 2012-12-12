namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the linear gauge track.
    /// </summary>
    public class GaugeLinearTrackBuilder : IHideObjectMembers
    {
        private readonly GaugeLinearTrack track;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeLinearTrackBuilder" /> class.
        /// </summary>
        /// <param name="linearTrack">The linear gauge track.</param>
        public GaugeLinearTrackBuilder(GaugeLinearTrack linearTrack)
        {
            track = linearTrack;
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
        public GaugeLinearTrackBuilder Color(string color)
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
        public GaugeLinearTrackBuilder Size(double size)
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
        public GaugeLinearTrackBuilder Visible(bool visible)
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
        public GaugeLinearTrackBuilder Border(int width, string color, ChartDashType dashType)
        {
            track.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }
    }
}