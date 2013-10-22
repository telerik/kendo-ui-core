namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bar series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartBoxPlotSeriesBuilder<T> : ChartSeriesBuilderBase<IChartBoxPlotSeries, ChartBoxPlotSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBoxPlotSeriesBuilder(IChartBoxPlotSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Sets the aggregate function for date series.
        /// This function is used when a category (an year, month, etc.) contains two or more points.
        /// </summary>
        /// <param name="lower">Lower aggregate name.</param>
        /// <param name="q1">Q1 aggregate name.</param>
        /// <param name="median">Median aggregate name.</param>
        /// <param name="q3">Q3 aggregate name.</param>
        /// <param name="upper">Upper aggregate name.</param>
        /// <param name="mean">Mean aggregate name.</param>
        /// <param name="outliers">Outliers aggregate name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        ///                  .Aggregate(
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.Max,
        ///                     ChartSeriesAggregate.First
        ///                   )
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Aggregate(
            ChartSeriesAggregate? lower = null,
            ChartSeriesAggregate? q1 = null,
            ChartSeriesAggregate? median = null,
            ChartSeriesAggregate? q3 = null,
            ChartSeriesAggregate? upper = null,
            ChartSeriesAggregate? mean = null,
            ChartSeriesAggregate? outliers = null
            )
        {
            Series.Aggregates.Lower = lower;
            Series.Aggregates.Q1 = q1;
            Series.Aggregates.Median = median;
            Series.Aggregates.Q3 = q3;
            Series.Aggregates.Upper = upper;
            Series.Aggregates.Mean = mean;
            Series.Aggregates.Outliers = outliers;

            return this;
        }

        /// <summary>
        /// Set distance between category clusters. 
        /// <param name="gap">
        /// A value of 1 means that there is a total of 1 point width between categories. 
        /// The distance is distributed evenly on each side.
        /// The default value is 1
        /// </param>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Gap(1.5))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Gap(double gap)
        {
            Series.Gap = gap;

            return this;
        }

        /// <summary>
        /// Sets a value indicating the distance between points in the same category.
        /// </summary>
        /// <param name="spacing">
        /// Value of 1 means that the distance between points in the same category.
        /// The default value is 0.3
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Spacing(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Spacing(double spacing)
        {
            Series.Spacing = spacing;

            return this;
        }

        /// <summary>
        /// Sets the points border
        /// </summary>
        /// <param name="width">The points border width.</param>
        /// <param name="color">The points border color (CSS syntax).</param>
        /// <param name="dashType">The points border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Border("1", "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBoxPlotSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Configures the ohlc chart lines.
        /// </summary>
        /// <param name="width">The lines width.</param>
        /// <param name="color">The lines color.</param>
        /// <param name="dashType">The lines dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)        
        ///               .Line(2, "red", ChartDashType.Dot)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBoxPlotSeriesBuilder<T> Line(int width, string color, ChartDashType dashType)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;

            return this;
        }

        /// <summary>
        /// Configures the ohlc line width.
        /// </summary>
        /// <param name="width">The lines width.</param>      
        public ChartBoxPlotSeriesBuilder<T> Line(int width)
        {
            return Line(width, null);
        }

        /// <summary>
        /// Configures the ohlc lines.
        /// </summary>
        /// <param name="width">The lines width.</param>
        /// <param name="color">The lines color.</param>    
        public ChartBoxPlotSeriesBuilder<T> Line(int width, string color)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;

            return this;
        }

        /// <summary>
        /// Configures the ohlc chart lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)        
        ///               .Line(line => line.Opacity(0.2)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBoxPlotSeriesBuilder<T> Line(Action<ChartLineBuilder> configurator)
        {
            configurator(new ChartLineBuilder(Series.Line));

            return this;
        }

        /// <summary>
        /// Configures the box plot chart outliers.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)    
        ///                .Outliers(outliers => outliers
        ///                    .Type(ChartMarkerShape.Triangle)
        ///                );
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Outliers(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Series.Outliers));

            return this;
        }

        /// <summary>
        /// Sets the visibility of box plot chart outliers.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper) 
        ///                .Outliers(true);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Outliers(bool visible)
        {
            Series.Outliers.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the box plot chart extremum.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)    
        ///                .Extremum(extremum => extremum
        ///                    .Type(ChartMarkerShape.Triangle)
        ///                );
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Extremum(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Series.Outliers));

            return this;
        }

        /// <summary>
        /// Sets the visibility of box plot chart extremum.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper) 
        ///                .Extremum(true);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBoxPlotSeriesBuilder<T> Extremum(bool visible)
        {
            Series.Outliers.Visible = visible;

            return this;
        }
    }
}