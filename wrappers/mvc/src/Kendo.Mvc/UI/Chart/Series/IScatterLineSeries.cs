using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IScatterLineSeries: IScatterSeries
    {
        /// <summary>
        /// The line chart line width.
        /// </summary>
        double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The chart line dash type.
        /// </summary>
        ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in scatter line series.
        /// </summary>
        ChartScatterLineMissingValues? MissingValues
        {
            get;
            set;
        }
    }
}
