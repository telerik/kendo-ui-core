// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart data labels.
    /// </summary>
    public class ChartMarkersBuilder
    {
        private readonly ChartMarkers lineMarkers;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartMarkersBuilder" /> class.
        /// </summary>
        /// <param name="chartLineMarkers">The line chart markers configuration.</param>
        public ChartMarkersBuilder(ChartMarkers chartLineMarkers)
        {
            lineMarkers = chartLineMarkers;
        }

        /// <summary>
        /// Sets the markers shape type.
        /// </summary>
        /// <param name="type">The markers shape type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Line(s => s.Sales)
        ///               .Markers(markers => markers
        ///                   .Type(ChartMarkerShape.Triangle)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMarkersBuilder Type(ChartMarkerShape type)
        {
            lineMarkers.Type = type;
            return this;
        }

        /// <summary>
        /// Sets the markers size.
        /// </summary>
        /// <param name="size">The markers size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Line(s => s.Sales)
        ///               .Markers(markers => markers
        ///                   .Size(10)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMarkersBuilder Size(int size)
        {
            lineMarkers.Size = size;
            return this;
        }

        /// <summary>
        /// Sets the markers visibility
        /// </summary>
        /// <param name="visible">The markers visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Line(s => s.Sales)
        ///               .Markers(markers => markers
        ///                   .Visible(true)
        ///               );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMarkersBuilder Visible(bool visible)
        {
            lineMarkers.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the markers border
        /// </summary>
        /// <param name="width">The markers border width.</param>
        /// <param name="color">The markers border color (CSS syntax).</param>
        /// <param name="dashType">The markers border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///                .Line(s => s.Sales)
        ///                .Markers(markers => markers
        ///                    .Border(1, "Red", ChartDashType.Dot)
        ///                );
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMarkersBuilder Border(int width, string color, ChartDashType dashType)
        {
            lineMarkers.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// The background color of the current series markers.
        /// </summary>
        /// <param name="backgorund">The background color of the current series markers. The background color is series color.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .Markers(markers => markers
        ///                     .Background("Red");
        ///                 );
        ///              )
        ///              .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartMarkersBuilder Background(string backgorund)
        {
            lineMarkers.Background = backgorund;

            return this;
        }
    }
}