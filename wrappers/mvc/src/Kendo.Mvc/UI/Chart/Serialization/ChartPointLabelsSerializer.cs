namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class ChartPointLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartPointLabels lineLabels;

        public ChartPointLabelsSerializer(ChartPointLabels lineLabels)
            : base(lineLabels)
        {
            this.lineLabels = lineLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (lineLabels.Position.HasValue)
            {
                FluentDictionary.For(result)
                    .Add("position", lineLabels.Position.ToString().ToCamelCase());
            }

            return result;
        }
    }
}