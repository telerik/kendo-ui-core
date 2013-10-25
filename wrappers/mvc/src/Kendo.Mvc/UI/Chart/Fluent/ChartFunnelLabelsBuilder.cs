namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart data labels.
    /// </summary>
    public class ChartFunnelLabelsBuilder : ChartLabelsBuilderBase<ChartFunnelLabelsBuilder>
    {
        private readonly ChartFunnelLabels funnelLabels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartFunnelLabels">The data labels configuration.</param>
        public ChartFunnelLabelsBuilder(ChartFunnelLabels chartFunnelLabels)
            : base(chartFunnelLabels)
        {
            funnelLabels = chartFunnelLabels;
        }

        /// <summary>
        /// Sets the labels align
        /// </summary>
        /// <param name="align">The labels align.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Funnel(p => p.Sales)
        ///               .Labels(labels => labels
        ///                   .Align(ChartFunnelLabelsAlign.Center)
        ///                   .Visible(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelLabelsBuilder Align(ChartFunnelLabelsAlign align)
        {
            funnelLabels.Align = align;
            return this;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="position">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Funnel(p => p.Sales)
        ///               .Labels(labels => labels
        ///                   .Position(ChartFunnelLabelsPosition.Center)
        ///                   .Visible(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelLabelsBuilder Position(ChartFunnelLabelsPosition position)
        {
            funnelLabels.Position = position;
            return this;
        }
    }
}