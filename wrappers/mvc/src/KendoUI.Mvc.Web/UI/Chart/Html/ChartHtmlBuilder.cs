// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    /// <summary>
    /// An HTML Builder for the Chart component
    /// </summary>
    public class ChartHtmlBuilder<T> : HtmlBuilderBase where T : class
    {
        private readonly Chart<T> chart;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The Chart component.</param>
        public ChartHtmlBuilder(Chart<T> component)
        {
            chart = component;
        }

        /// <summary>
        /// Creates the chart top-level div.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode CreateChart()
        {
            return new HtmlElement("div")
                .Attributes(chart.HtmlAttributes)
                .PrependClass(UIPrimitives.Widget, "t-chart");
        }

        /// <summary>
        /// Builds the Chart component markup.
        /// </summary>
        /// <returns></returns>
        protected override IHtmlNode BuildCore()
        {
            return CreateChart();
        }
    }
}
