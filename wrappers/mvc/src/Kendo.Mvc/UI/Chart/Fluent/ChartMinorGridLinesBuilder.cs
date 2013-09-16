namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartMinorGridLinesBuilder"/>.
    /// </summary>
    public class ChartMinorGridLinesBuilder : ChartLineBuilderBase
    {
        private readonly ChartLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartMinorGridLinesBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartMinorGridLinesBuilder(ChartLine chartLine)
            : base (chartLine)
        {
            line = chartLine;
        }

        /// <summary>
        /// Sets the line skip
        /// </summary>
        /// <param name="skip">The line skip.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MinorGridLines(lines => lines.Skip(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMinorGridLinesBuilder Skip(int skip)
        {
            line.Skip = skip;
            return this;
        }

        /// <summary>
        /// Sets the line step
        /// </summary>
        /// <param name="step">The line step.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MinorGridLines(lines => lines.Step(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMinorGridLinesBuilder Step(int step)
        {
            line.Step = step;
            return this;
        }
    }
}