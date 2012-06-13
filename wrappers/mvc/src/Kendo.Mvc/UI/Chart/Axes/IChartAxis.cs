namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines a generic Chart axis.
    /// </summary>
    public interface IChartAxis<TValue> : IChartAxisBase
        where TValue : struct
    {
        /// <summary>
        /// The axis plot bands.
        /// </summary>
        IList<ChartPlotBand<TValue>> PlotBands { get; set; }
    }
}
