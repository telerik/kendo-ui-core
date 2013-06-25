namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The base time interval for the axis.
    /// </summary>
    public enum ChartAxisBaseUnit
    {
        /// <summary>
        /// Seconds
        /// </summary>
        Seconds,

        /// <summary>
        /// Minutes
        /// </summary>
        Minutes,

        /// <summary>
        /// Hours
        /// </summary>
        Hours,

        /// <summary>
        /// Days
        /// </summary>
        Days,

        /// <summary>
        /// Months
        /// </summary>
        Months,

        /// <summary>
        /// Weeks
        /// </summary>
        Weeks,

        /// <summary>
        /// Years
        /// </summary>
        Years,

        /// <summary>
        /// Automatic base unit based on limit set from MaxDataGroups.
        /// Note that the BaseUnitStep setting will be disregarded.
        /// </summary>
        Fit
    }
}