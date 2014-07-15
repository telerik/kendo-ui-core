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

            var fromLabelsData = rangeBarLabels.From.CreateSerializer().Serialize();
            if (fromLabelsData.Count > 0)
            {
                result.Add("from", fromLabelsData);
            }

            var toLabelsData = rangeBarLabels.To.CreateSerializer().Serialize();
            if (toLabelsData.Count > 0)
            {
                result.Add("to", toLabelsData);
            }

            return result;
        }
    }
}