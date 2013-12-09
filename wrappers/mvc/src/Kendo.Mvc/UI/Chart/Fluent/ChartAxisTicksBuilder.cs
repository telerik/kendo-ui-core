namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartAxisTicks"/>.
    /// </summary>
    public class ChartAxisTicksBuilder : IHideObjectMembers
    {
        private readonly ChartAxisTicks ticks;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisTicksBuilder" /> class.
        /// </summary>
        /// <param name="gaugeTicks">The chart axis ticks.</param>
        public ChartAxisTicksBuilder(ChartAxisTicks gaugeTicks)
        {
            ticks = gaugeTicks;
        }

        /// <summary>
        /// Sets the ticks size
        /// </summary>
        /// <param name="size">The ticks size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("chart")
        ///           .ValueAxis(axis => axis.MajorTicks(ticks => ticks.Size(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTicksBuilder Size(int size)
        {
            ticks.Size = size;
            return this;
        }

        /// <summary>
        /// Sets the ticks visibility
        /// </summary>
        /// <param name="visible">The ticks visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("chart")
        ///           .ValueAxis(axis => axis.MajorTicks(ticks => ticks.Visible(false)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTicksBuilder Visible(bool visible)
        {
            ticks.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the line skip
        /// </summary>
        /// <param name="skip">The line skip.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MajorTicks(lines => lines.Skip(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTicksBuilder Skip(double skip)
        {
            ticks.Skip = skip;
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
        ///           .CategoryAxis(axis => axis.MajorTicks(lines => lines.Step(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTicksBuilder Step(double step)
        {
            ticks.Step = step;
            return this;
        }

        /// <summary>
        /// Sets the line color
        /// </summary>
        /// <param name="step">The line color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MajorTicks(lines => lines.Color("red")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisTicksBuilder Color(string color)
        {
            ticks.Color = color;
            return this;
        }
    }
}