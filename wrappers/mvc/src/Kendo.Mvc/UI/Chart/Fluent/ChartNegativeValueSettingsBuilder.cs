namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartNegativeValueSettings"/>.
    /// </summary>
    public class ChartNegativeValueSettingsBuilder : IHideObjectMembers
    {
        private readonly ChartNegativeValueSettings negativeValues;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNegativeValueSettingsBuilder" /> class.
        /// </summary>
        /// <param name="negativeValues">The negative value settings.</param>
        public ChartNegativeValueSettingsBuilder(ChartNegativeValueSettings negativeValues)
        {
            this.negativeValues = negativeValues;
        }

        /// <summary>
        /// Sets the color for bubbles representing negative values
        /// </summary>
        /// <param name="color">The bubble color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bubble(s => s.x, s => s.y, s => s.size)
        ///               .NegativeValues(n => n
        ///                   .Visible(true)
        ///                   .Color("#ff0000")
        ///               );
        ///            )
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartNegativeValueSettingsBuilder Color(string color)
        {
            negativeValues.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the visibility for bubbles representing negative values
        /// </summary>
        /// <param name="visible">The visibility for bubbles representing negative values.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bubble(s => s.x, s => s.y, s => s.size)
        ///               .NegativeValues(n => n
        ///                   .Visible(true)
        ///               );
        ///            )
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