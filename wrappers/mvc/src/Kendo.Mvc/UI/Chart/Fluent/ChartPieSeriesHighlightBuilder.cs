namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring pie series highlight.
    /// </summary>
    public class ChartPieSeriesHighlightBuilder : ChartSeriesHighlightBuilderBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPieSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartPieSeriesHighlightBuilder(ChartSeriesHighlight highlight)
            : base(highlight)
        {
        }

        /// <summary>
        /// Sets the pie highlight color.
        /// </summary>
        /// <param name="color">The highlight color</param>
        public ChartPieSeriesHighlightBuilder Color(string color)
        {
            Highlight.Color = color;
            return this;
        }
    }
}