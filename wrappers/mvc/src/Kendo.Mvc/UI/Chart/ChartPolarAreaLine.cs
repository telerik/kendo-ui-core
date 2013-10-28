using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public class ChartPolarAreaLine: ChartLineBase
    {
        
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAreaLine" /> class.
        /// </summary>
        public ChartPolarAreaLine()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAreaLine" /> class.
        /// </summary>
        public ChartPolarAreaLine(int width, string color, ChartDashType dashType, bool visible)
            : base(width, color, dashType, visible)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarAreaLine" /> class.
        /// </summary>
        public ChartPolarAreaLine(int width, string color, ChartDashType dashType, bool visible, ChartPolarAreaStyle style)
            : base(width, color, dashType, visible)
        {
            this.Style = style;
        }

        /// <summary>
        /// The style of the polar area.
        /// </summary>
        public ChartPolarAreaStyle Style
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPolarAreaLineSerializer(this);
        }
    }
}
