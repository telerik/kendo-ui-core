namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring candlestick series highlight.
    /// </summary>
    public class ChartCandlestickSeriesHighlightBuilder : ChartSeriesHighlightBuilderBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCandlestickSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartCandlestickSeriesHighlightBuilder(ChartSeriesHighlight highlight)
            : base(highlight)
        {
        }

        /// <summary>
        /// Configures the candlestick highlight line width.
        /// </summary>
        /// <param name="width">The lines width.</param>      
        public ChartCandlestickSeriesHighlightBuilder Line(int width)
        {
            return Line(width, null);
        }

        /// <summary>
        /// Configures the candlestick highlight lines.
        /// </summary>
        /// <param name="width">The lines width.</param>
        /// <param name="color">The lines color.</param>    
        public ChartCandlestickSeriesHighlightBuilder Line(int width, string color)
        {
            Highlight.Line.Width = width;
            Highlight.Line.Color = color;

            return this;
        }

        /// <summary>
        /// Configures the candlestick highlight chart lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public ChartCandlestickSeriesHighlightBuilder Line(Action<ChartAreaLineBuilder> configurator)
        {
            configurator(new ChartAreaLineBuilder(Highlight.Line));

            return this;
        }
    }
}