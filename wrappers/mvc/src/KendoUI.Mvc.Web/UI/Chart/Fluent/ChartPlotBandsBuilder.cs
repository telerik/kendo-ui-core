// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring plot bands.
    /// </summary>
    public class ChartPlotBandsBuilder
    {
        private readonly ChartPlotBand item;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPlotBandsBuilder"/> class.
        /// </summary>
        /// <param name="item">The plot bands.</param>
        public ChartPlotBandsBuilder(ChartPlotBand item)
        {
            Guard.IsNotNull(item, "item");

            this.item = item;
        }

        /// <summary>
        /// Sets the plot band start position.
        /// </summary>
        /// <param name="from">The plot band band start position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBand => plotBand
        ///                      .Add().From(1).Color("Red");
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder From(decimal from)
        {
            item.From = from;
            return this;
        }

        /// <summary>
        /// Sets the plot band end position.
        /// </summary>
        /// <param name="to">The plot band end position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBand => plotBand
        ///                      .Add().To(2).Color("Red");
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder To(decimal to)
        {
            item.To = to;
            return this;
        }

        /// <summary>
        /// Sets the plot band background color
        /// </summary>
        /// <param name="color">The plot band background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBand => plotBand
        ///                      .Add().Color("Red");
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder Color(string color)
        {
            item.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the plot band background color
        /// </summary>
        /// <param name="color">The plot band background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///                .PlotBands(plotBand => plotBand
        ///                      .Add().Opacity(0.5);
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartPlotBandsBuilder Opacity(double opacity)
        {
            item.Opacity = opacity;
            return this;
        }
    }
}