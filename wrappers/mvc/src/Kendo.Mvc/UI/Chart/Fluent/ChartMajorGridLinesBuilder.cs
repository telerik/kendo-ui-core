namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartMajorGridLinesBuilder"/>.
    /// </summary>
    public class ChartMajorGridLinesBuilder : ChartLineBuilderBase
    {
        private readonly ChartLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartMajorGridLinesBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartMajorGridLinesBuilder(ChartLine chartLine)
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
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Skip(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMajorGridLinesBuilder Skip(int skip)
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
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Step(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartMajorGridLinesBuilder Step(int step)
        {
            line.Step = step;
            return this;
        }
    }
}