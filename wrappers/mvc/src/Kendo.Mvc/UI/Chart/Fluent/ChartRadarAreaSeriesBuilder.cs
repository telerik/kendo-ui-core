using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartRadarAreaSeriesBuilder<T> : ChartAreaSeriesBuilderBase<IChartRadarAreaSeries, ChartRadarAreaSeriesBuilder<T>>
        where T : class
    {
         /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartRadarAreaSeriesBuilder(IChartRadarAreaSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the radar area chart line.
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <param name="color">The line color.</param>
        /// <param name="dashType">The line dashType.</param>
        /// <param name="style">The line style.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RadarArea(s => s.Sales)        
        ///               .Line(2, "red", ChartDashType.Dot, ChartScatterLineStyle.Smooth)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartRadarAreaSeriesBuilder<T> Line(int width, string color, ChartDashType dashType, ChartRadarAreaStyle style)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;
            Series.Line.Style = style;

            return this;
        }

        /// <summary>
        /// Configures the radar area chart line.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
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
        public ChartRadarAreaSeriesBuilder<T> Line(Action<ChartRadarAreaLineBuilder> configurator)
        {

            configurator(new ChartRadarAreaLineBuilder(Series.Line));

            return this;
        }
    }
}
