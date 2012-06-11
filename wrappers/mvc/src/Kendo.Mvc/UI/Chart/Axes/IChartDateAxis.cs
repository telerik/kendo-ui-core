namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Represents a numeric axis
    /// </summary>
    public interface IChartDateAxis : IChartValueAxis
    {
        /// <summary>
        /// The base time interval for the axis labels.
        /// The default baseUnit is determined automatically from the value range.
        /// </summary>
        ChartAxisBaseUnit? BaseUnit
        {
            get;
            set;
        }

        /// <summary>
        /// The dates at which perpendicular axes cross this axis.
        /// </summary>
        IEnumerable<DateTime> AxisCrossingValues { get; set; }

        /// <summary>
        /// The axis minimum (start) date
        /// </summary>
        DateTime? Min { get; set; }

        /// <summary>
        /// The axis maximum (end) date
        /// </summary>
        DateTime? Max { get; set; }

        /// <summary>
        /// The interval between major divisions in base units.
        /// </summary>
        double? MajorUnit { get; set; }

        /// <summary>
        /// The interval between minor divisions in base units.
        /// It defaults to 1/5th of the majorUnit.
        /// </summary>
        double? MinorUnit { get; set; }
    }
}