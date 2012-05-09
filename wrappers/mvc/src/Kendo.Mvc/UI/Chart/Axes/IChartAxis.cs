namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines a generic Chart axis.
    /// </summary>
    public interface IChartAxis
    {
        /// <summary>
        /// Gets or sets the minor tick size.
        /// </summary>
        int? MinorTickSize { get; set; }

        /// <summary>
        /// Gets or sets the major tick size.
        /// </summary>
        int? MajorTickSize { get; set; }

        /// <summary>
        /// The major tick type.
        /// </summary>
        ChartAxisTickType? MajorTickType { get; set; }

        /// <summary>
        /// The minor tick type.
        /// </summary>
        ChartAxisTickType? MinorTickType { get; set; }

        /// <summary>
        /// The major grid lines configuration.
        /// </summary>
        ChartLine MajorGridLines { get; set; }

        /// <summary>
        /// The minor grid lines configuration.
        /// </summary>
        ChartLine MinorGridLines { get; set; }

        /// <summary>
        /// The axis line configuration.
        /// </summary>
        ChartLine Line { get; set; }

        /// <summary>
        /// The values at which perpendicular axes cross this axis.
        /// </summary>
        IEnumerable<double> AxisCrossingValues { get; set; }

        /// <summary>
        /// The axis labels.
        /// </summary>
        ChartAxisLabels Labels { get; set; }

        /// <summary>
        /// The axis plot bands.
        /// </summary>
        IList<ChartPlotBand> PlotBands { get; set; }

        /// <summary>
        /// The axis title.
        /// </summary>
        ChartAxisTitle Title { get; set; }

        /// <summary>
        /// The axis name. Leave empty to use the "primary" default value.
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// The color for all axis elements. Can be overriden by individual settings.
        /// </summary>
        string Color { get; set; }

        /// <summary>
        /// A value indicating if the axis labels should be rendered in reverse.
        /// </summary>
        bool? Reverse { get; set; }

        /// <summary>
        /// Gets the axis serializer.
        /// </summary>
        IChartSerializer CreateSerializer();
    }
}
