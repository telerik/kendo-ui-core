// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartLegend"/>.
    /// </summary>
    public class ChartLegendBuilder : IHideObjectMembers
    {
        private readonly ChartLegend legend;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLegendBuilder" /> class.
        /// </summary>
        /// <param name="chartLegend">The chart legend.</param>
        public ChartLegendBuilder(ChartLegend chartLegend)
        {
            legend = chartLegend;
        }

        /// <summary>
        /// Sets the legend labels font
        /// </summary>
        /// <param name="font">The legend labels font (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Font("16px Arial,Helvetica,sans-serif"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Font(string font)
        {
            legend.Font = font;
            return this;
        }

        /// <summary>
        /// Sets the legend labels color
        /// </summary>
        /// <param name="color">The labels color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Color("red"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLegendBuilder Color(string color)
        {
            legend.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the legend background color
        /// </summary>
        /// <param name="background">The background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Background("red"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Background(string background)
        {
            legend.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the legend position
        /// </summary>
        /// <param name="position">The legend position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Position(ChartLegendPosition position)
        {
            legend.Position = position;
            return this;
        }

        /// <summary>
        /// Sets the legend visibility
        /// </summary>
        /// <param name="visible">The legend visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Visible(false))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Visible(bool visible)
        {
            legend.Visible = visible;
            return this;
        }

        /// <summary>
        /// Sets the legend X and Y offset from its position
        /// </summary>
        /// <param name="offsetX">The legend X offset from its position.</param>
        /// <param name="offsetY">The legend Y offset from its position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Offset(10, 50))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Offset(int offsetX, int offsetY)
        {
            legend.OffsetX = offsetX;
            legend.OffsetY = offsetY;
            return this;
        }

        /// <summary>
        /// Sets the legend margin
        /// </summary>
        /// <param name="top">The legend top margin.</param>
        /// <param name="right">The legend right margin.</param>
        /// <param name="bottom">The legend bottom margin.</param>
        /// <param name="left">The legend top margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Margin(0, 5, 5, 0))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Margin(int top, int right, int bottom, int left)
        {
            legend.Margin.Top = top;
            legend.Margin.Right = right;
            legend.Margin.Bottom = bottom;
            legend.Margin.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the legend margin
        /// </summary>
        /// <param name="margin">The legend margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Margin(20))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Margin(int margin)
        {
            legend.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the legend padding
        /// </summary>
        /// <param name="top">The legend top padding.</param>
        /// <param name="right">The legend right padding.</param>
        /// <param name="bottom">The legend bottom padding.</param>
        /// <param name="left">The legend left padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Padding(0, 5, 5, 0))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Padding(int top, int right, int bottom, int left)
        {
            legend.Padding.Top = top;
            legend.Padding.Right = right;
            legend.Padding.Bottom = bottom;
            legend.Padding.Left = left;
            return this;
        }

        /// <summary>
        /// Sets the legend padding
        /// </summary>
        /// <param name="padding">The legend padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Padding(20))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Padding(int padding)
        {
            legend.Padding = new ChartSpacing(padding);
            return this;
        }

        /// <summary>
        /// Sets the legend border
        /// </summary>
        /// <param name="width">The legend border width.</param>
        /// <param name="color">The legend border color (CSS syntax).</param>
        /// <param name="dashType">The legend border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Legend(legend => legend.Border(1, "#000", ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLegendBuilder Border(int width, string color, ChartDashType dashType)
        {
            legend.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }
    }
}