

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;

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