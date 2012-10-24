namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface ISeriesContainer
    {
        /// <summary>
        /// The component series.
        /// </summary>
        IList<IChartSeries> Series
        {
            get;
        }
    }
}
