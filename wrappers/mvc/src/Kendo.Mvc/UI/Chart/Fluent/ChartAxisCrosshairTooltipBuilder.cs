using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartAxisCrosshairTooltipBuilder"/>.
    /// </summary>
    public class ChartAxisCrosshairTooltipBuilder : IHideObjectMembers
    {
        private readonly ChartAxisCrosshairTooltip tooltip;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisCrosshairTooltipBuilder" /> class.
        /// </summary>
        /// <param name="tooltip">The chart crosshair tooltip.</param>
        public ChartAxisCrosshairTooltipBuilder(ChartAxisCrosshairTooltip tooltip)
        {
            this.tooltip = tooltip;
        }

        /// <summary>
        /// Sets the tooltip font
        /// </summary>
        /// <param name="font">The tooltip font (CSS format).</param>
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
        ///                .Visible(true)
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Font("14px Arial,Helvetica,sans-serif")
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Font(string font)
        {
            tooltip.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the tooltip visible
        /// </summary>
        /// <param name="visible">The tooltip visible.</param>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>     
        public ChartAxisCrosshairTooltipBuilder Visible(bool visible)
        {
            tooltip.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the tooltip background
        /// </summary>
        /// <param name="background">The tooltip background.</param>
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
        ///                      .Visible(true)
        ///                      .Tooltip(tooltip => tooltip
        ///                           .Background("red")
        ///                           .Visible(true)
        ///                      )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        public ChartAxisCrosshairTooltipBuilder Background(string background)
        {
            tooltip.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the tooltip text color
        /// </summary>
        /// <param name="color">
        /// The tooltip text color.
        /// The default is the same as the series labels color.
        /// </param>
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
        ///                .Visible(true)
        ///                .Tooltip(tooltip => tooltip
        ///                     .color("red")
        ///                     .Visible(true)
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Color(string color)
        {
            tooltip.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the tooltip padding
        /// </summary>
        /// <param name="top">The tooltip top padding.</param>
        /// <param name="right">The tooltip right padding.</param>
        /// <param name="bottom">The tooltip bottom padding.</param>
        /// <param name="left">The tooltip left padding.</param>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Padding(0, 5, 5, 0)
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Padding(int top, int right, int bottom, int left)
        {
            tooltip.Padding.Top = top;
            tooltip.Padding.Right = right;
            tooltip.Padding.Bottom = bottom;
            tooltip.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the tooltip padding
        /// </summary>
        /// <param name="padding">The tooltip padding.</param>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Padding(20)
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Padding(int padding)
        {
            tooltip.Padding = new ChartSpacing(padding);
            return this;
        }

        /// <summary>
        /// Sets the tooltip border
        /// </summary>
        /// <param name="width">The tooltip border width.</param>
        /// <param name="color">The tooltip border color (CSS syntax).</param>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Border(1, "Red")
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Border(int width, string color)
        {
            tooltip.Border = new ChartElementBorder(width, color, ChartDashType.Solid);
            return this;
        }

        /// <summary>
        /// Configures the tooltip border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartAxisCrosshairTooltipBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(tooltip.Border));
            return this;
        }

        /// <summary>
        /// Sets the tooltip format
        /// </summary>
        /// <param name="format">The tooltip format.</param>
        /// <remarks>
        /// The format string is ignored if a template is set.
        /// </remarks>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Format("{0:C}")
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Format(string format)
        {
            tooltip.Format = format;
            return this;
        }

        /// <summary>
        /// Sets the tooltip template
        /// </summary>
        /// <param name="template">The tooltip template.</param>
        /// <value>
        /// A client-side template for the tooltip.
        /// <list type="bullet">
        ///     <listheader>
        ///     Available template variables:
        ///     </listheader>
        ///     <item>value - the point value</item>
        /// </list>
        /// </value>
        /// <remarks>
        /// The format string is ignored if a template is set.
        /// </remarks>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Template("|&lt;#= value #|&gt;")
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisCrosshairTooltipBuilder Template(string template)
        {
            tooltip.Template = template;
            return this;
        }

        /// <summary>
        /// Sets the tooltip opacity.
        /// </summary>
        /// <param name="opacity">
        /// The series opacity in the range from 0 (transparent) to 1 (opaque).
        /// The default value is 1.
        /// </param>
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
        ///                     .Tooltip(tooltip => tooltip
        ///                          .Opacity(0.5)
        ///                          .Visible(true)
        ///                     )
        ///                )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAxisCrosshairTooltipBuilder Opacity(double opacity)
        {
            tooltip.Opacity = opacity;

            return this;
        }
    }
}