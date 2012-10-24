namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartDateSelectionSerializer : IChartSerializer
    {
        private readonly ChartDateSelection selection;

        public ChartDateSelectionSerializer(ChartDateSelection selection)
        {
            this.selection = selection;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("from", selection.From, () => selection.From.HasValue)
                .Add("to", selection.To, () => selection.To.HasValue);

            return result;
        }
    }
}