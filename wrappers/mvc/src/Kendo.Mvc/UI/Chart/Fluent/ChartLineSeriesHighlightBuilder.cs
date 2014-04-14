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
        
        /// <summary>
        /// Configures the line chart markers for highlighted points.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public ChartLineSeriesHighlightBuilder Markers(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Highlight.Markers));

            return this;
        }

        /// <summary>
        /// Sets the visibility of line chart markers for highlighted points.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        public ChartLineSeriesHighlightBuilder Markers(bool visible)
        {
            Highlight.Markers.Visible = visible;

            return this;
        }
    }
}