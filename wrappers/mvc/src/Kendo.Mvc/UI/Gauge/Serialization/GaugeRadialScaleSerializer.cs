namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeRadialScaleSerializer : GaugeScaleSerializerBase
    {
        private readonly IRadialScale scale;

        public GaugeRadialScaleSerializer(IRadialScale scale)
            : base(scale)
        {
            this.scale = scale;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            FluentDictionary.For(result)
                .Add("endAngle", scale.EndAngle, () => scale.EndAngle.HasValue)
                .Add("rangeSize", scale.RangeSize, () => scale.RangeSize.HasValue)
                .Add("rangeDistance", scale.RangeDistance, () => scale.RangeDistance.HasValue)
                .Add("startAngle", scale.StartAngle, () => scale.StartAngle.HasValue);

            var labelsData = scale.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            return result;
        }
    }
}
