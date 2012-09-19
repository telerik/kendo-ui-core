namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartOHLCAggregatesSerializer : IChartSerializer
    {
        private readonly ChartOHLCAggregates aggregates;

        public ChartOHLCAggregatesSerializer(ChartOHLCAggregates aggregates)
        {
            this.aggregates = aggregates;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("open", aggregates.Open.ToString().ToLowerInvariant(), () => aggregates.Open.HasValue)
                .Add("high", aggregates.High.ToString().ToLowerInvariant(), () => aggregates.High.HasValue)
                .Add("low", aggregates.Low.ToString().ToLowerInvariant(), () => aggregates.Low.HasValue)
                .Add("close", aggregates.Close.ToString().ToLowerInvariant(), () => aggregates.Close.HasValue);

            return result;
        }
    }
}