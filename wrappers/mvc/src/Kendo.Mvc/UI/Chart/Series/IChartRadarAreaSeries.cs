using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IChartRadarAreaSeries: IAreaSeries
    {
        /// <summary>
        /// The radar area chart line configuration.
        /// </summary>
        ChartRadarAreaLine Line
        {
            get;
            set;
        }
    }
}
