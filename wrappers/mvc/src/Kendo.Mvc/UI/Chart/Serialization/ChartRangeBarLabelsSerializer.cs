namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    internal class ChartRangeBarLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartRangeBarLabels rangeBarLabels;

        public ChartRangeBarLabelsSerializer(ChartRangeBarLabels rangeBarLabels)
            : base(rangeBarLabels)
        {
            this.rangeBarLabels = rangeBarLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (rangeBarLabels.From != null)
            {
                result.Add("from", rangeBarLabels.From.CreateSerializer().Serialize());
            }

            if (rangeBarLabels.To != null)
            {
                result.Add("to", rangeBarLabels.To.CreateSerializer().Serialize());
            }

            return result;
        }
    }
}