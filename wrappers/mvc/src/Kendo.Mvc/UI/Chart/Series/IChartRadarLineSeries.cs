using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IChartRadarLineSeries: ILineSeries
    {
        /// <summary>
        /// The radar line series style.
        /// </summary>
        ChartRadarLineStyle Style { get; set; }
    }
}
