namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartBoxPlotAggregatesSerializer : IChartSerializer
    {
        private readonly ChartBoxPlotAggregates aggregates;

        public ChartBoxPlotAggregatesSerializer(ChartBoxPlotAggregates aggregates)
        {
            this.aggregates = aggregates;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("lower", aggregates.Lower.ToString().ToLowerInvariant(), () => aggregates.Lower.HasValue)
                .Add("q1", aggregates.Q1.ToString().ToLowerInvariant(), () => aggregates.Q1.HasValue)
                .Add("median", aggregates.Median.ToString().ToLowerInvariant(), () => aggregates.Median.HasValue)
                .Add("q3", aggregates.Q3.ToString().ToLowerInvariant(), () => aggregates.Q3.HasValue)
                .Add("mean", aggregates.Mean.ToString().ToLowerInvariant(), () => aggregates.Mean.HasValue)
                .Add("upper", aggregates.Upper.ToString().ToLowerInvariant(), () => aggregates.Upper.HasValue)
                .Add("outliers", aggregates.Outliers.ToString().ToLowerInvariant(), () => aggregates.Outliers.HasValue);

            return result;
        }
    }
}