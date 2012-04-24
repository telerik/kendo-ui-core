namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the chart data binding settings
    /// </summary>
    public class ChartDataBindingSettings
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDataBindingSettings" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartDataBindingSettings(IChart chart)
        {
            Ajax = new ChartBindingSettings(chart);
        }

        /// <summary>
        /// Represents the chart Ajax binding settings
        /// </summary>
        public ChartBindingSettings Ajax
        {
            get;
            private set;
        }
    }
}
