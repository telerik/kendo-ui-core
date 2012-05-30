namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring ranges.
    /// </summary>
    public class GaugeScaleRangesBuilder
    {
        private readonly GaugeScaleRanges item;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleRangesBuilder"/> class.
        /// </summary>
        /// <param name="item">The scale ranges.</param>
        public GaugeScaleRangesBuilder(GaugeScaleRanges item)
        {

            this.item = item;
        }

        /// <summary>
        /// Sets the ranges start position.
        /// </summary>
        /// <param name="from">The ranges start position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale
        ///                .Ranges(ranges => ranges
        ///                      .Add().From(1).Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleRangesBuilder From(double from)
        {
            item.From = from;
            return this;
        }

        /// <summary>
        /// Sets the ranges end position.
        /// </summary>
        /// <param name="to">The ranges end position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale
        ///                .Ranges(ranges => ranges
        ///                     .Add().To(2).Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleRangesBuilder To(double to)
        {
            item.To = to;
            return this;
        }

        /// <summary>
        /// Sets the ranges color
        /// </summary>
        /// <param name="color">The ranges color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale
        ///                .Ranges(ranges => ranges
        ///                     .Add().Color("Red");
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleRangesBuilder Color(string color)
        {
            item.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the ranges opacity
        /// </summary>
        /// <param name="opacity">The ranges opacity.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale
        ///                .Ranges(ranges => ranges
        ///                     .Add().Opacity(0.5);
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleRangesBuilder Opacity(double opacity)
        {
            item.Opacity = opacity;
            return this;
        }
    }
}