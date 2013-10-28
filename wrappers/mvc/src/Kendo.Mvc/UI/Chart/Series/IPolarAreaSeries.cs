using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IChartPolarAreaSeries: IScatterSeries
    {
        /// <summary>
        /// The polar area chart line configuration.
        /// </summary>
        ChartPolarAreaLine Line 
        { 
            get; 
            set; 
        }
    }
}
