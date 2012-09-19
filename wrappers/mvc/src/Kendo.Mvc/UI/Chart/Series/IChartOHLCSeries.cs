using System.Collections;

namespace Kendo.Mvc.UI
{
    public interface IChartOHLCSeries : IChartSeries
    {
        /// <summary>
        /// Aggregates function for date series.
        /// </summary>
        ChartOHLCAggregates Aggregates
        {
            get;
            set;
        }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        double? Gap
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

        /// <summary>
        /// The ohlc chart line configuration.
        /// </summary>
        ChartLine Line
        {
            get;
            set;
        }

        /// <summary>
        /// The type of the chart.
        /// </summary>
        string Type
        {
            get;
            set;
        }

        /// <summary>
        /// Space between points.
        /// </summary>
        double? Spacing
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the point border.
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model color member name.
        /// </summary>
        /// <value>The model color member name.</value>
        string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model base color member name.
        /// </summary>
        /// <value>The model base color member name.</value>
        string BaseColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model open member name.
        /// </summary>
        /// <value>The model open member name.</value>
        string OpenMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model high member name.
        /// </summary>
        /// <value>The model high member name.</value>
        string HighMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model low member name.
        /// </summary>
        /// <value>The model low member name.</value>
        string LowMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model close member name.
        /// </summary>
        /// <value>The model close member name.</value>
        string CloseMember
        {
            get;
            set;
        }
    }
}