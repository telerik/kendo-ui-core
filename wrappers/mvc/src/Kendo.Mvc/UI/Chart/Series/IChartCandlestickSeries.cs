using System.Collections;

namespace Kendo.Mvc.UI
{
    public interface IChartCandlestickSeries : IChartOHLCSeries
    {
        /// <summary>
        /// Gets the model down color member name.
        /// </summary>
        /// <value>The model down color member name.</value>
        string DownColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay.
        /// </summary>
        ChartBarSeriesOverlay Overlay
        {
            get;
            set;
        }
    }
}