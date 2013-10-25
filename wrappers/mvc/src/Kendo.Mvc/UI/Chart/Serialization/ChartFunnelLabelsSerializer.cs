namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class ChartFunnelLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartFunnelLabels funnelLabels;

        public ChartFunnelLabelsSerializer(ChartFunnelLabels funnelLabels)
            : base(funnelLabels)
        {
            this.funnelLabels = funnelLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            
            if (funnelLabels.Position.HasValue)
            {
                result.Add("position", funnelLabels.Position.ToString().ToCamelCase());
            }

            if (funnelLabels.Align.HasValue)
            {
                result.Add("align", funnelLabels.Align.ToString().ToCamelCase());
            }

            return result;
        }
    }
}