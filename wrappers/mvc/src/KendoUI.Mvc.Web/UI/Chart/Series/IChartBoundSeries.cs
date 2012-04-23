

namespace KendoUI.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents Chart series bound to data.
    /// </summary>
    public interface IChartBoundSeries : IChartSeries
    {
        /// <summary>
        /// Gets the data member of the series.
        /// </summary>
        string Member
        {
            get;
            set;
        }

        /// <summary>
        /// The data used for binding.
        /// </summary>
        IEnumerable Data
        {
            get;
            set;
        }
    }
}
