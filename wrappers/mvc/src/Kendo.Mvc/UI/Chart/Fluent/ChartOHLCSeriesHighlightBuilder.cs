namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring OHLC series highlight.
    /// </summary>
    public class ChartOHLCSeriesHighlightBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCSeriesHighlightBuilder"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartOHLCSeriesHighlightBuilder(ChartSeriesHighlight highlight)
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
        /// Configures the candlestick highlight line width.
        /// </summary>
        /// <param name="width">The lines width.</param>      
        public ChartOHLCSeriesHighlightBuilder Line(int width)
        {
            return Line(width, null);
        }

        /// <summary>
        /// Configures the candlestick highlight lines.
        /// </summary>
        /// <param name="width">The lines width.</param>
        /// <param name="color">The lines color.</param>    
        public ChartOHLCSeriesHighlightBuilder Line(int width, string color)
        {
            Highlight.Line.Width = width;
            Highlight.Line.Color = color;

            return this;
        }

        /// <summary>
        /// Configures the OHLC highlight chart lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public ChartOHLCSeriesHighlightBuilder Line(Action<ChartAreaLineBuilder> configurator)
        {
            configurator(new ChartAreaLineBuilder(Highlight.Line));

            return this;
        }
    }
}