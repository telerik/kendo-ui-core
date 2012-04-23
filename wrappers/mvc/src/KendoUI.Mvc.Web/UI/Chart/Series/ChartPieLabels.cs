// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents the options of the pie chart labels
    /// </summary>
    public class ChartPieLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPieLabels" /> class.
        /// </summary>
        public ChartPieLabels()
        {
        }

        /// <summary>
        /// Defines the alignment of the pie labels.
        /// </summary>
        public ChartPieLabelsAlign? Align
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the distance between the pie chart and labels.
        /// </summary>
        public int? Distance
        {
            get;
            set;
        }

        /// <summary>
        /// Defines the position of the pie labels.
        /// </summary>
        public ChartPieLabelsPosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartPieLabelsSerializer(this);
        }
    }
}