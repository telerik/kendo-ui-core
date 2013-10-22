using System.Collections;

namespace Kendo.Mvc.UI
{
    public interface IChartBoxPlotSeries : IChartSeries
    {
        /// <summary>
        /// Aggregates function for date series.
        /// </summary>
        ChartBoxPlotAggregates Aggregates
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
        /// Gets the model data category member name.
        /// </summary>
        /// <value>The model data category member name.</value>
        string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model note text member name.
        /// </summary>
        /// <value>The model note text member name.</value>
        string NoteTextMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model lower member name.
        /// </summary>
        /// <value>The model lower member name.</value>
        string LowerMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model q1 member name.
        /// </summary>
        /// <value>The model q1 member name.</value>
        string Q1Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model median member name.
        /// </summary>
        /// <value>The model median member name.</value>
        string MedianMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model close member name.
        /// </summary>
        /// <value>The model close member name.</value>
        string Q3Member
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model upper member name.
        /// </summary>
        /// <value>The model upper member name.</value>
        string UpperMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model mean member name.
        /// </summary>
        /// <value>The model mean member name.</value>
        string MeanMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model outliers member name.
        /// </summary>
        /// <value>The model outliers member name.</value>
        string OutliersMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets outliers.
        /// </summary>
        ChartMarkers Outliers
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets extremes.
        /// </summary>
        ChartMarkers Extremes
        {
            get;
            set;
        }
    }
}