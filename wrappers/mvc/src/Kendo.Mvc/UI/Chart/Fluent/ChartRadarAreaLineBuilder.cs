using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartRadarAreaLineBuilder : ChartLineBuilderBase
    {
        private readonly ChartRadarAreaLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartRadarAreaLineBuilder(ChartRadarAreaLine chartLine)
            : base(chartLine)
        {
            line = chartLine;
        }

        /// <summary>
        /// Sets the line opacity.
        /// </summary>
        /// <param name="opacity">The line opacity.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RadarArea(s => s.Sales)
        ///               .Line(line => line.Opacity(0.2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartRadarAreaLineBuilder Opacity(double opacity)
        {
            line.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Configures the line style for radar area series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .RadarArea(s => s.Sales)
        ///                .Line(line => line.Style(ChartRadarAreaStyle.Smooth))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartRadarAreaLineBuilder Style(ChartRadarAreaStyle style)
        {
            line.Style = style;

            return this;
        }
    }
}
