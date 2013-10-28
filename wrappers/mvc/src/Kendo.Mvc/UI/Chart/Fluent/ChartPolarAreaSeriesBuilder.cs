using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartPolarAreaSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartPolarAreaSeries, ChartPolarAreaSeriesBuilder<T>>
         where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAreaSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartPolarAreaSeriesBuilder(IChartPolarAreaSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the polar area chart line.
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
        ///               .PolarArea(s => s.Sales)        
        ///               .Line(2, "red", ChartDashType.Dot, ChartPolarAreaStyle.Smooth)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        public ChartPolarAreaSeriesBuilder<T> Line(int width, string color, ChartDashType dashType, ChartPolarAreaStyle style)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;
            Series.Line.Style = style;

            return this;
        }


        /// <summary>
        /// Configures the polar area chart line.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .PolarArea(s => s.Sales)        
        ///               .Line(line => line.Width(2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>   
        public ChartPolarAreaSeriesBuilder<T> Line(Action<ChartPolarAreaLineBuilder> configurator)
        {
            configurator(new ChartPolarAreaLineBuilder(Series.Line));

            return this;
        }
    }
}
