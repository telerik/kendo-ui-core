namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the behavior for handling missing values in step line series.
    /// </summary>
    public enum ChartStepLineMissingValues
    {
        /// <summary>
        /// The value is interpolated from neighboring points.
        /// </summary>
        Interpolate,

        /// <summary>
        /// The value is assumed to be zero.
        /// </summary>
        Zero,

        /// <summary>
        /// The line stops before the missing point and continues after it.
        /// </summary>
        Gap
    }
}