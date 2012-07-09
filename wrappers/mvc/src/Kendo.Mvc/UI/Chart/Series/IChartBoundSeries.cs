namespace Kendo.Mvc.UI
{
    using System.Collections;

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
