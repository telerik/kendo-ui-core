// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the options of the axis labels
    /// </summary>
    public class ChartAxisLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisLabels" /> class.
        /// </summary>
        public ChartAxisLabels()
        {
        }

        /// <summary>
        /// A value indicating whether to render the axis labels on the other side.
        /// </summary>
        public bool? Mirror
        {
            get;
            set;
        }

        /// <summary>
        /// Label rendering step. Every n-th label is rendered where n is the step.
        /// </summary>
        public int? Step
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisLabelsSerializer(this);
        }
    }
}