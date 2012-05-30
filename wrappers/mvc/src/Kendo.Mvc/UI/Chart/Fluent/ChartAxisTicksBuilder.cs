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
    }
}