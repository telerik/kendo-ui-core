namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the behavior rendering the line between values in line series.
    /// </summary>
    public enum ChartStackType
    {
        /// <summary>
        /// The value of the stack is the sum of all points in the category (or group).
        /// </summary>
        Normal,

        /// <summary>
        /// The value of the stack is always 100% (1.0). Points within the category (or group) are represented as percentages.
        /// </summary>
        Stack100
    }
}