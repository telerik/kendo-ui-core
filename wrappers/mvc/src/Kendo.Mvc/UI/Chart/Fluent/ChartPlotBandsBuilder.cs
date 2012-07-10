namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring plot band.
    /// </summary>
    public class ChartPlotBandsBuilder<T>
        where T : struct
    {
        private readonly ChartPlotBand<T> item;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPlotBandsBuilder{T}"/> class.
        /// </summary>
        /// <param name="item">The plot band.</param>
        public ChartPlotBandsBuilder(ChartPlotBand<T> item)
        {
            this.item = item;
        }

        /// <summary>
        /// Sets the plot band start position.
        /// </summary>
        /// <param name="from">The plot band start position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBands => plotBands
        ///                      .Add().From(1).Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder<T> From(T from)
        {
            item.From = from;
            return this;
        }

        /// <summary>
        /// Sets the plot band end position.
        /// </summary>
        /// <param name="to">The plot band end position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBands => plotBands
        ///                      .Add().To(2).Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder<T> To(T to)
        {
            item.To = to;
            return this;
        }

        /// <summary>
        /// Sets the plot band background color
        /// </summary>
        /// <param name="background">The plot band background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBands => plotBands
        ///                      .Add().Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder<T> Color(string color)
        {
            item.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the plot band opacity
        /// </summary>
        /// <param name="opacity">The plot band opacity.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBands => plotBands
        ///                      .Add().Opacity(0.5);
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder<T> Opacity(double opacity)
        {
            item.Opacity = opacity;
            return this;
        }
    }
}