// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartLine"/>.
    /// </summary>
    public class ChartLineBuilder : ChartLineBuilderBase
    {
        private readonly ChartLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartLineBuilder(ChartLine chartLine)
            : base (chartLine)
        {
            line = chartLine;
        }

        /// <summary>
        /// Sets the line visibility
        /// </summary>
        /// <param name="visible">The line visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Visible(true)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLineBuilder Visible(bool visible)
        {
            line.Visible = visible;
            return this;
        }
    }
}