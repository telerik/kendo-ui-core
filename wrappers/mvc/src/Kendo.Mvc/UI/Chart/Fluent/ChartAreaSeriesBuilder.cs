namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring area series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartAreaSeriesBuilder<T> : ChartAreaSeriesBuilderBase<IChartAreaSeries, ChartAreaSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartAreaSeriesBuilder(IChartAreaSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Sets the series color field
        /// </summary>
        /// <param name="colorField">The series color field</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Area(s => s.Sales).ColorFied("Color"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAreaSeriesBuilder<T> ColorField(string colorField)
        {
            Series.ColorMember = colorField;

            return this;
        }

        /// <summary>
        /// Configures the area chart line.
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
        ///               .Area(s => s.Sales)        
        ///               .Line(2, "red", ChartDashType.Dot, ChartAreaStyle.Smooth)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAreaSeriesBuilder<T> Line(int width, string color, ChartDashType dashType, ChartAreaStyle style)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;
            Series.Line.Style = style;

            return this;
        }

        /// <summary>
        /// Configures the area chart line.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)        
        ///               .Line(line => line.Opacity(0.2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAreaSeriesBuilder<T> Line(Action<ChartAreaLineBuilder> configurator)
        {

            configurator(new ChartAreaLineBuilder(Series.Line));

            return this;
        }

        /// <summary>
        /// Configures the series error bars
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)        
        ///               .ErrorBars(e => e.Value(1))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        public ChartAreaSeriesBuilder<T> ErrorBars(Action<CategoricalErrorBarsBuilder> configurator)
        {
            configurator(new CategoricalErrorBarsBuilder(Series.ErrorBars));
            return this;
        }  
    }
}