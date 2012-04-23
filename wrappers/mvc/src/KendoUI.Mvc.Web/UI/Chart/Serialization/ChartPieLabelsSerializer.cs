

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;

    internal class ChartPieLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartPieLabels pieLabels;

        public ChartPieLabelsSerializer(ChartPieLabels pieLabels)
            : base(pieLabels)
        {
            this.pieLabels = pieLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("distance", pieLabels.Distance, () => pieLabels.Distance.HasValue);

            if (pieLabels.Position.HasValue)
            {
                result.Add("position", pieLabels.Position.ToString().ToCamelCase());
            }

            if (pieLabels.Align.HasValue)
            {
                result.Add("align", pieLabels.Align.ToString().ToCamelCase());
            }

            return result;
        }
    }
}