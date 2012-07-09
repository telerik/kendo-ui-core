namespace Kendo.Mvc.UI
{
    public class ChartAxisDefaults<T> : ChartAxisBase<T, double>, IChartAxisDefaults
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCategoryAxis{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAxisDefaults(Chart<T> chart)
            : base(chart)
        {
            MajorGridLines = new ChartLine();
            MinorGridLines = new ChartLine();
            Labels = new ChartAxisLabels();
            Title = new ChartAxisTitle();
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartAxisSerializerBase<double>(this);
        }
    }
}