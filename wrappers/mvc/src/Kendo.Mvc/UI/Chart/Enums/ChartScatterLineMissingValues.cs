namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the behavior for handling missing values in scatter line series.
    /// </summary>
    public enum ChartScatterLineMissingValues
    {
        /// <summary>
        /// The value is interpolated from neighboring points.
        /// </summary>
        Interpolate,

        /// <summary>
        /// The line stops before the missing point and continues after it.
        /// </summary>
        Gap
    }
}