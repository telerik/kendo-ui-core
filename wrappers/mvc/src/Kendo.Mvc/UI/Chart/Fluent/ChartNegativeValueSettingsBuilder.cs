namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartNegativeValueSettings"/>.
    /// </summary>
    public class ChartNegativeValueSettingsBuilder : IHideObjectMembers
    {
        private readonly ChartNegativeValueSettings negativeValues;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartNegativeValueSettingsBuilder(ChartNegativeValueSettings negativeValues)
        {
            this.negativeValues = negativeValues;
        }

        /// <summary>
        /// Sets the line color
        /// </summary>
        /// <param name="color">The line color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartNegativeValueSettingsBuilder Color(string color)
        {
            negativeValues.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the line color
        /// </summary>
        /// <param name="color">The line color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartNegativeValueSettingsBuilder Visible(bool visible)
        {
            negativeValues.Visible = visible;
            return this;
        }
    }
}