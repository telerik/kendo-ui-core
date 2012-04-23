

namespace KendoUI.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the chart data labels.
    /// </summary>
    public class ChartPointLabelsBuilder : ChartLabelsBuilderBase<ChartPointLabelsBuilder>
    {
        private readonly ChartPointLabels lineLabels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPointLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartPointLabels">The data labels configuration.</param>
        public ChartPointLabelsBuilder(ChartPointLabels chartPointLabels)
            : base(chartPointLabels)
        {
            lineLabels = chartPointLabels;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="position">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Line(s => s.Sales)
        ///               .Labels(labels => labels
        ///                   .Position(ChartPointLabelsPosition.Above)
        ///                   .Visible(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPointLabelsBuilder Position(ChartPointLabelsPosition position)
        {
            lineLabels.Position = position;
            return this;
        }

        /// <summary>
        /// This method will be removed in future versions. Use Position(ChartPointLabelsPosition) instead.
        /// </summary>
        /// <param name="position">The labels position.</param>
        [Obsolete("This method will be removed in future versions. Use Position(ChartPointLabelsPosition) instead.")]
        public ChartPointLabelsBuilder Position(ChartLineLabelsPosition position)
        {
            lineLabels.Position = (ChartPointLabelsPosition)
                Enum.Parse(typeof(ChartPointLabelsPosition), position.ToString());

            return this;
        }
    }
}