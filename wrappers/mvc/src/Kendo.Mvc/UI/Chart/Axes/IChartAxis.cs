namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IChartAxis<TValue> : IChartAxisBase
        where TValue : struct
    {
        /// <summary>
        /// The axis plot bands.
        /// </summary>
        IList<ChartPlotBand<TValue>> PlotBands { get; set; }

        /// <summary>
        /// The name of the pane that the axis should be rendered in.
        /// </summary>
        string Pane { get; set; }

        /// <summary>
        /// Gets or sets the axis visibility.
        /// </summary>
        bool? Visible
        {
            get;
            set;
        }
    }
}
