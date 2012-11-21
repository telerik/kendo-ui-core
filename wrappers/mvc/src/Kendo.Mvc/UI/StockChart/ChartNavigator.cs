namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class ChartNavigator<T> : ISeriesContainer where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigator{T}" /> class.
        /// </summary>
        public ChartNavigator()
        {
            Series = new List<IChartSeries>();
            Select = new ChartDateSelection();
        }

        /// <summary>
        /// Gets the navigator series.
        /// </summary>
        public IList<IChartSeries> Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the navigator selection.
        /// </summary>
        public ChartDateSelection Select
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartNavigatorSerializer<T>(this);
        }
    }
}