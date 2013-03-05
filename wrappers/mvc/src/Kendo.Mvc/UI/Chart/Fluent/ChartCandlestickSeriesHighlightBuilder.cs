namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring candlestick series highlight.
    /// </summary>
    public class ChartCandlestickSeriesHighlightBuilder : ChartSeriesHighlightBuilder
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
        /// Sets the bubble highlight border width.
        /// The color is computed automatically from the base point color.
        /// </summary>
        /// <param name="width">The bubble highlight border width.</param>
        public ChartCandlestickSeriesHighlightBuilder Border(int width)
        {
            return Border(width, null);
        }

        /// <summary>
        /// Sets the bubble highlight border width.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color</param>
        public ChartCandlestickSeriesHighlightBuilder Border(int width, string color)
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
        public ChartCandlestickSeriesHighlightBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Highlight.Border));
            return this;
        }

        /// <summary>
        /// Sets the bubble highlight opacity.
        /// </summary>
        /// <param name="opacity">The bubble highlight opacity.</param>
        public ChartCandlestickSeriesHighlightBuilder Opacity(double opacity)
        {
            Highlight.Opacity = opacity;
            return this;
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