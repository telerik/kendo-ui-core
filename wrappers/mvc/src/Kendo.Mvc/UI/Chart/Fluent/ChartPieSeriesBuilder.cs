namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring pie series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartPieSeriesBuilder<T> : IHideObjectMembers
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPieSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartPieSeriesBuilder(IChartPieSeries series)
        {

             Series = series;
        }

        /// <summary>
        /// Gets or sets the series.
        /// </summary>
        /// <value>The series.</value>
        public IChartPieSeries Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the name of the series.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Pie(s => s.Sales, s => s.DateString).Name("Sales"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPieSeriesBuilder<T> Name(string text)
        {
            Series.Name = text;

            return this;
        }

        /// <summary>
        /// Sets the series opacity.
        /// </summary>
        /// <param name="opacity">
        /// The series opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Pie(s => s.Sales, s => s.DateString).Opacity(0.5))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPieSeriesBuilder<T> Opacity(double opacity)
        {
            Series.Opacity = opacity;

            return this;
        }

        /// <summary>
        /// Sets the padding of the chart.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Pie(s => s.Sales, s => s.DateString).Padding(100))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPieSeriesBuilder<T> Padding(int padding)
        {
            Series.Padding = padding;

            return this;
        }

        /// <summary>
        /// Sets the start angle of the first pie segment.
        /// </summary>
        /// <param name="startAngle">The pie start angle(in degrees).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Pie(s => s.Sales, s => s.DateString).StartAngle(100))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPieSeriesBuilder<T> StartAngle(int startAngle)
        {
            Series.StartAngle = startAngle;

            return this;
        }

        /// <summary>
        /// Configures the pie chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Pie(s => s.Sales, s => s.DateString)
        ///                .Labels(labels => labels
        ///                    .Color("red")
        ///                    .Visible(true)
        ///                );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPieSeriesBuilder<T> Labels(Action<ChartPieLabelsBuilder> configurator)
        {

            configurator(new ChartPieLabelsBuilder(Series.Labels));

            return this;
        }

        /// <summary>
        /// Sets the visibility of pie chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Pie(s => s.Sales, s => s.DateString)
        ///                .Labels(true);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPieSeriesBuilder<T> Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return this;
        }

        /// <summary>
        /// Sets the pie segments border
        /// </summary>
        /// <param name="width">The pie segments border width.</param>
        /// <param name="color">The pie segments border color (CSS syntax).</param>
        /// <param name="dashType">The pie segments border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Pie(s => s.Sales, s => s.DateString).Border(1, "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPieSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Sets the pie segments effects overlay
        /// </summary>
        /// <param name="overlay">
        /// The pie segment effects overlay.
        /// The default value is set in the theme.
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Pie(s => s.Sales, s => s.DateString).Overlay(ChartPieSeriesOverlay.None))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPieSeriesBuilder<T> Overlay(ChartPieSeriesOverlay overlay)
        {
            Series.Overlay = overlay;

            return this;
        }

        /// <summary>
        /// Configures the pie chart connectors.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Pie(s => s.Sales, s => s.DateString)
        ///                .Connectors(c => c
        ///                    .Color("red")
        ///                );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPieSeriesBuilder<T> Connectors(Action<ChartPieConnectorsBuilder> configurator)
        {

            configurator(new ChartPieConnectorsBuilder(Series.Connectors));

            return this;
        }

        /// <summary>
        /// Configures the pie highlight
        /// </summary>
        /// <param name="configurator">The configuration action.</param>        
        public ChartPieSeriesBuilder<T> Highlight(Action<ChartPieSeriesHighlightBuilder> configurator)
        {
            configurator(new ChartPieSeriesHighlightBuilder(Series.Highlight));
            return this;
        }
    }
}