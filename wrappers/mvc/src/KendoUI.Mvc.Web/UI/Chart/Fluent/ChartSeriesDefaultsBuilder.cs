// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using KendoUI.Mvc.Infrastructure;

    public class ChartSeriesDefaultsBuilder<TModel> : IHideObjectMembers where TModel : class
    {
        private Chart<TModel> Chart;

        public ChartSeriesDefaultsBuilder(Chart<TModel> chart)
        {
            Guard.IsNotNull(chart, "chart");

            Chart = chart;
        }

        /// <summary>
        /// Defines the default settings for bar series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Bar()
        {
            return new ChartBarSeriesBuilder<TModel>(Chart.SeriesDefaults.Bar);
        }

        /// <summary>
        /// Defines the default settings for column series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Column()
        {
            return new ChartBarSeriesBuilder<TModel>(Chart.SeriesDefaults.Column);
        }

        /// <summary>
        /// Defines the default settings for line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> Line()
        {
            return new ChartLineSeriesBuilder<TModel>(Chart.SeriesDefaults.Line);
        }

        /// <summary>
        /// Defines the default settings for vertical line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine()
        {
            return new ChartLineSeriesBuilder<TModel>(Chart.SeriesDefaults.VerticalLine);
        }

        /// <summary>
        /// Defines the default settings for area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> Area()
        {
            return new ChartAreaSeriesBuilder<TModel>(Chart.SeriesDefaults.Area);
        }

        /// <summary>
        /// Defines the default settings for vertical area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea()
        {
            return new ChartAreaSeriesBuilder<TModel>(Chart.SeriesDefaults.VerticalArea);
        }

        /// <summary>
        /// Defines the default settings for pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie()
        {
            return new ChartPieSeriesBuilder<TModel>(Chart.SeriesDefaults.Pie);
        }

        /// <summary>
        /// Defines the default settings for scatter series.
        /// </summary>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter()
        {
            return new ChartScatterSeriesBuilder<TModel>(Chart.SeriesDefaults.Scatter);
        }

        /// <summary>
        /// Defines the default settings for scatter line series.
        /// </summary>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine()
        {
            return new ChartScatterLineSeriesBuilder<TModel>(Chart.SeriesDefaults.ScatterLine);
        }
    }
}