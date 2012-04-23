// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart data labels.
    /// </summary>
    public class ChartBarLabelsBuilder : ChartLabelsBuilderBase<ChartBarLabelsBuilder>
    {
        private readonly ChartBarLabels barLabels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartBarLabels">The data labels configuration.</param>
        public ChartBarLabelsBuilder(ChartBarLabels chartBarLabels)
            : base(chartBarLabels)
        {
            barLabels = chartBarLabels;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="position">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bar(s => s.Sales)
        ///               .Labels(labels => labels
        ///                   .Position(ChartBarLabelsPosition.InsideEnd)
        ///                   .Visible(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBarLabelsBuilder Position(ChartBarLabelsPosition position)
        {
            barLabels.Position = position;
            return this;
        }
    }
}