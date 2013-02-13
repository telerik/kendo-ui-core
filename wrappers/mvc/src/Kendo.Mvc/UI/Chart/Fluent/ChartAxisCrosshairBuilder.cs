using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartLine"/>.
    /// </summary>
    public class ChartAxisCrosshairBuilder : ChartLineBuilderBase
    {
        private readonly ChartAxisCrosshair crosshair;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartAxisCrosshairBuilder(ChartAxisCrosshair crosshair)
            : base(crosshair)
        {
            this.crosshair = crosshair;
        }

        /// <summary>
        /// Configures the crosshair tooltip
        /// </summary>
        /// <param name="configurator">The tooltip configuration action</param>
        public ChartAxisCrosshairBuilder Tooltip(Action<ChartAxisCrosshairTooltipBuilder> configurator)
        {
            configurator(new ChartAxisCrosshairTooltipBuilder(crosshair.Tooltip));
            return this;
        }

        /// <summary>
        /// Sets the crosshair visible
        /// </summary>
        /// <param name="visible">The crosshair visible.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => {
        ///                .series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
        ///                .series.Bar(new double[] { 67.96, 68.93, 75, 74, 78 }).Name("United States");
        ///           })
        ///           .CategoryAxis(axis => axis
        ///                .Categories("2005", "2006", "2007", "2008", "2009")
        ///                .Crosshair(crosshair => crosshair
        ///                     .Visible(true)
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        public ChartAxisCrosshairBuilder Visible(bool visible)
        {
            crosshair.Visible = visible;
            return this;
        }
    }
}