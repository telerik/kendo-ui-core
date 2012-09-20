namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring donut series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartDonutSeriesBuilder<T> : ChartPieSeriesBuilder<T>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDonutSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartDonutSeriesBuilder(IChartDonutSeries series)
            : base(series)
        {
             Series = series;
        }

        /// <summary>
        /// Gets or sets the series.
        /// </summary>
        /// <value>The series.</value>
        public new IChartDonutSeries Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the margin of the donut series.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Donut(s => s.Sales, s => s.DateString).Margin(10))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartDonutSeriesBuilder<T> Margin(int margin)
        {
            Series.Margin = margin;

            return this;
        }

        /// <summary>
        /// Sets the the size of the donut hole.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Donut(s => s.Sales, s => s.DateString).HoleSize(40))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartDonutSeriesBuilder<T> HoleSize(int holeSize)
        {
            Series.HoleSize = holeSize;

            return this;
        }

        /// <summary>
        /// Sets the size of the donut series.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Donut(s => s.Sales, s => s.DateString).Size(20))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartDonutSeriesBuilder<T> Size(int size)
        {
            Series.Size = size;

            return this;
        }
    }
}