namespace Kendo.Mvc.UI
{
    public interface IChartAreaSeries : IAreaSeries, ICategoricalErrorBarsSeries
    {

        /// <summary>
        /// The area chart line configuration.
        /// </summary>
        ChartAreaLine Line
        {
            get;
            set;
        }
    }
}