namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring pie series highlight.
    /// </summary>
    public class ChartPieSeriesHighlightBuilder : ChartSeriesHighlightBuilder
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
        /// Sets the bubble highlight border width.
        /// The color is computed automatically from the base point color.
        /// </summary>
        /// <param name="width">The bubble highlight border width.</param>
        public ChartPieSeriesHighlightBuilder Border(int width)
        {
            return Border(width, null);
        }

        /// <summary>
        /// Sets the bubble highlight border width.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color</param>
        public ChartPieSeriesHighlightBuilder Border(int width, string color)
        {
            Highlight.Border.Width = width;
            Highlight.Border.Color = color;
            return this;
        }

        /// <summary>
        /// Configures the highlight border
        /// </summary>
        /// <param name="configurator"></param>
        /// <returns></returns>
        public ChartPieSeriesHighlightBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Highlight.Border));
            return this;
        }

        /// <summary>
        /// Sets the bubble highlight opacity.
        /// </summary>
        /// <param name="opacity">The bubble highlight opacity.</param>
        public ChartPieSeriesHighlightBuilder Opacity(double opacity)
        {
            Highlight.Opacity = opacity;
            return this;
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