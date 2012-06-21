namespace Kendo.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents chart bubble series
    /// </summary>
    public interface IChartBubbleSeries : IChartScatterSeries
    {
        /// <summary>
        /// Gets the Size data member of the series.
        /// </summary>
        string SizeMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Category data member of the series.
        /// </summary>
        string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Color data member of the series.
        /// </summary>
        string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the VisibleInLegend data member of the series.
        /// </summary>
        string VisibleInLegendMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the minimum bubble size of the series.
        /// </summary>
        int? MinSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the maximum bubble size of the series.
        /// </summary>
        int? MaxSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the negative value bubbles options.
        /// </summary>
        ChartNegativeValueSettings NegativeValues
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the bubble border.
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }
    }
}