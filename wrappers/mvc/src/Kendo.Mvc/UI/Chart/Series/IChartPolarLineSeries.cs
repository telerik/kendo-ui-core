using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IChartPolarLineSeries : IScatterLineSeries
    {
        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartPolarLineStyle Style
        {
            get;
            set;
        }        
    }
}
