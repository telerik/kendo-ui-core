namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the position of bar/column chart labels
    /// </summary>
    public enum ChartBarLabelsPosition
    {
        /// <summary>
        /// The label is positioned at the bar center
        /// </summary>
        Center,

        /// <summary>
        /// The label is positioned inside, near the end of the bar
        /// </summary>
        InsideEnd,

        /// <summary>
        /// The label is positioned inside, near the base of the bar 
        /// </summary>
        InsideBase,

        /// <summary>
        /// The label is positioned outside, near the end of the bar.
        /// Not applicable for stacked bar series.
        /// </summary>
        OutsideEnd
    }
}