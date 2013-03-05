namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring series highlight.
    /// </summary>
    public class ChartSeriesHighlightBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartSeriesHighlightBuilder(ChartSeriesHighlight highlight)
        {
            Highlight = highlight;
        }

        /// <summary>
        /// Gets or sets the highlight
        /// </summary>
        protected ChartSeriesHighlight Highlight
        {
            get;
            set;
        }

        /// <summary>
        /// Sets the highlight visibility
        /// </summary>
        /// <param name="visible">The highlight visibility.</param>       
        public ChartSeriesHighlightBuilder Visible(bool visible)
        {
            Highlight.Visible = visible;
            return this;
        }
    }
}