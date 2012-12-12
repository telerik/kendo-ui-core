namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;
    using System.ComponentModel;

    /// <summary>
    /// Defines the fluent interface for configuring series highlight.
    /// </summary>
    public class ChartSeriesHighlightBuilderBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesHighlightBuilderBase"/> class.
        /// </summary>
        /// <param name="highlight">The series highlight.</param>
        public ChartSeriesHighlightBuilderBase(ChartSeriesHighlight highlight)
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
        /// Sets the bubble highlight border width.
        /// The color is computed automatically from the base point color.
        /// </summary>
        /// <param name="width">The bubble highlight border width.</param>
        public ChartSeriesHighlightBuilderBase Border(int width)
        {
            return Border(width, null);
        }

        /// <summary>
        /// Sets the bubble highlight border width.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color</param>
        public ChartSeriesHighlightBuilderBase Border(int width, string color)
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
        public ChartSeriesHighlightBuilderBase Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Highlight.Border));
            return this;
        }

        /// <summary>
        /// Sets the bubble highlight opacity.
        /// </summary>
        /// <param name="opacity">The bubble highlight opacity.</param>
        public ChartSeriesHighlightBuilderBase Opacity(double opacity)
        {
            Highlight.Opacity = opacity;
            return this;
        }
    }
}