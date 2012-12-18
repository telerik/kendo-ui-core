namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeRadialScaleLabelsSerializer : GaugeScaleLabelsSerializerBase
    {
        private readonly GaugeRadialScaleLabels labels;

        public GaugeRadialScaleLabelsSerializer(GaugeRadialScaleLabels labels)
            : base(labels)
        {
            this.labels = labels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("position", labels.Position.ToString().ToLowerInvariant(), () => labels.Position.HasValue);

            return result;
        }
    }
}