// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart data points tooltip.
    /// </summary>
    public class ChartTooltipBuilder : IHideObjectMembers
    {
        private readonly ChartTooltip tooltip;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartTooltipBuilder" /> class.
        /// </summary>
        /// <param name="chartTooltip">The data point tooltip configuration.</param>
        public ChartTooltipBuilder(ChartTooltip chartTooltip)
        {
            tooltip = chartTooltip;
        }

        /// <summary>
        /// Sets the tooltip font
        /// </summary>
        /// <param name="font">The tooltip font (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Font("14px Arial,Helvetica,sans-serif")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Font(string font)
        {
            tooltip.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the tooltip visibility
        /// </summary>
        /// <param name="visible">The tooltip visibility. The tooltip is not visible by default.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Visible(bool visible)
        {
            tooltip.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the tooltip background color
        /// </summary>
        /// <param name="background">
        /// The tooltip background color.
        /// The default is determined from the series color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Background("Red")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Background(string background)
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Color("Red")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Color(string color)
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Padding(0, 5, 5, 0)
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Padding(int top, int right, int bottom, int left)
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Padding(20)
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Padding(int padding)
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Border(1, "Red")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Border(int width, string color)
        {
            tooltip.Border = new ChartElementBorder(width, color, ChartDashType.Solid);
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Format("{0:C}")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Format(string format)
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
        ///     <item>category - the category name</item>
        ///     <item>series - the data series configuration object</item>
        ///     <item>dataItem - the original data item (client-side binding only)</item>
        /// </list>
        /// </value>
        /// <remarks>
        /// The format string is ignored if a template is set.
        /// </remarks>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Template("&lt;#= category #&gt; - &lt;#= value #&gt;")
        ///               .Visible(true)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartTooltipBuilder Template(string template)
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
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Tooltip(tooltip => tooltip
        ///               .Opacity(0.5)
        ///               .Visible(true)
        ///           )          
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartTooltipBuilder Opacity(double opacity)
        {
            tooltip.Opacity = opacity;

            return this;
        }
    }
}