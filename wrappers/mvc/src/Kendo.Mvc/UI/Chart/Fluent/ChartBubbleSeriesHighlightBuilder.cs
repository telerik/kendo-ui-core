namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring bubble series highlight.
    /// </summary>
    public class ChartBubbleSeriesHighlightBuilder : ChartSeriesHighlightBuilderBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBubbleSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartBubbleSeriesHighlightBuilder(ChartSeriesHighlight highlight)
            : base(highlight)
        {
        }
    }
}