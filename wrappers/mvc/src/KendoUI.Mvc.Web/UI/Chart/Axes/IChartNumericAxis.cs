namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents a numeric axis
    /// </summary>
    public interface IChartNumericAxis : IChartValueAxis
    {
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
        /// The axis label format
        /// </summary>
        string Format { get; set; }
    }
}