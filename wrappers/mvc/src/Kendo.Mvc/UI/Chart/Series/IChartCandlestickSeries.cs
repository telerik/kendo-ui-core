using System.Collections;

namespace Kendo.Mvc.UI
{
    public interface IChartCandlestickSeries : IChartOHLCSeries
    {
        /// <summary>
        /// Gets the model base color member name.
        /// </summary>
        /// <value>The model base color member name.</value>
        string BaseColorMember
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