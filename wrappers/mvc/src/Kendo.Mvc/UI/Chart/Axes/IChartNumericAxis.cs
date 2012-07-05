using System.Collections.Generic;
namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents a numeric axis
    /// </summary>
    public interface IChartNumericAxis : IChartValueAxis, IChartAxis<double>
    {
        /// <summary>
        /// The values at which perpendicular axes cross this axis.
        /// </summary>
        IEnumerable<double> AxisCrossingValues { get; set; }

        /// <summary>
        /// The axis minimum value
        /// </summary>
        double? Min { get; set; }

        /// <summary>
        /// The axis maximum value
        /// </summary>
        double? Max { get; set; }

        /// <summary>
        /// The interval between major divisions
        /// </summary>
        double? MajorUnit { get; set; }

        /// <summary>
        /// The interval between minor divisions.
        /// </summary>
        double? MinorUnit
        {
            get;
            set;
        }
    }
}