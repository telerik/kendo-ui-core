namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class GaugeScaleLabelsSerializerBase : ChartLabelsBase
    {
        private readonly GaugeScaleLabelsBase labels;

        public GaugeScaleLabelsSerializerBase(GaugeScaleLabelsBase labels)
            : base (labels)
        {
            this.labels = labels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            return result;
        }
    }
}