namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

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
                .Add("from", selection.From.ToJavaScriptString(), () => selection.From.HasValue)
                .Add("to", selection.To.ToJavaScriptString(), () => selection.To.HasValue);

            return result;
        }
    }
}