// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PlotArea"/>.
    /// </summary>
    public class PlotAreaBuilder : IHideObjectMembers
    {
        private readonly PlotArea plotArea;

        /// <summary>
        /// Initializes a new instance of the <see cref="PlotAreaBuilder" /> class.
        /// </summary>
        /// <param name="plotArea">The plot area.</param>
        public PlotAreaBuilder(PlotArea plotArea)
        {
            this.plotArea = plotArea;
        }

        /// <summary>
        /// Sets the Plot area background color
        /// </summary>
        /// <param name="background">The background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .PlotArea(plotArea => plotArea.Background("Red"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public PlotAreaBuilder Background(string background)
        {
            plotArea.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the Plot area margin
        /// </summary>
        /// <param name="top">The plot area top margin.</param>
        /// <param name="right">The plot area right margin.</param>
        /// <param name="bottom">The plot area bottom margin.</param>
        /// <param name="left">The plot area left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .PlotArea(plotArea => plotArea.Margin(0, 5, 5, 0))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public PlotAreaBuilder Margin(int top, int right, int bottom, int left)
        {
            plotArea.Margin.Top = top;
            plotArea.Margin.Right = right;
            plotArea.Margin.Bottom = bottom;
            plotArea.Margin.Left = left;

            return this;
        }

        /// <summary>
        /// Sets the Plot area margin
        /// </summary>
        /// <param name="margin">The plot area margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .PlotArea(plotArea => plotArea.Margin(5))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>          
        public PlotAreaBuilder Margin(int margin)
        {
            plotArea.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the Plot area border
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color (CSS syntax).</param>
        /// <param name="dashType">The border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .PlotArea(plotArea => plotArea.Border(1, "#000", ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public PlotAreaBuilder Border(int width, string color, ChartDashType dashType)
        {
            plotArea.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }
    }
}