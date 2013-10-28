using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public class ChartRadarAreaLine: ChartLineBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaLine" /> class.
        /// </summary>
        public ChartRadarAreaLine(int width, string color, ChartDashType dashType, bool visible)
            : base(width, color, dashType, visible)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarAreaLine" /> class.
        /// </summary>
        public ChartRadarAreaLine()
        {
        }


        /// <summary>
        /// The style of the radar area.
        /// </summary>
        public ChartRadarAreaStyle Style
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRadarAreaLineSerializer(this);
        }
    }
}
