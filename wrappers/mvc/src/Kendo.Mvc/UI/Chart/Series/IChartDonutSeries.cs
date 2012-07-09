namespace Kendo.Mvc.UI
{
    public interface IChartDonutSeries : IChartPieSeries
    {
        /// <summary>
        /// Gets or sets the margin of the donut series.
        /// </summary>
        int? Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the size of the donut hole.
        /// </summary>
        int? HoleSize
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the size of the donut series.
        /// </summary>
        int? Size
        {
            get;
            set;
        }
    }
}