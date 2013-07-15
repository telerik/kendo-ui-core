namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IChartAxis<TValue> : IChartAxisBase
        where TValue : struct
    {
        /// <summary>
        /// The axis plot bands.
        /// </summary>
        IList<ChartPlotBand> PlotBands { get; set; }

        /// <summary>
        /// The axis notes configuration.
        /// </summary>
        ChartAxisNotes Notes { get; set; }

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

        /// <summary>
        /// The angle (degrees) where the 0 value is placed. It defaults to 0.
        /// Angles increase counterclockwise and zero is to the right. Negative values are acceptable.
        /// </summary>
        double? StartAngle
        {
            get;
            set;
        }
    }
}