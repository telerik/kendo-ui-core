namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartDateSelectionSerializer : IChartSerializer
    {
        private readonly ChartDateSelection range;

        public ChartDateSelectionSerializer(ChartDateSelection range)
        {
            this.range = range;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("from", range.From, () => range.From.HasValue)
                .Add("to", range.To, () => range.To.HasValue);

            return result;
        }
    }
}