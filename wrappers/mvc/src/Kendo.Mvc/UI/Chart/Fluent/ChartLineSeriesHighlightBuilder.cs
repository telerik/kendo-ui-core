namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring candlestick series highlight.
    /// </summary>
    public class ChartLineSeriesHighlightBuilder : ChartSeriesHighlightBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartLineSeriesHighlightBuilder(ChartSeriesHighlight highlight)
            : base(highlight)
        {
        }
    }
}