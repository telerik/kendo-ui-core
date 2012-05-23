namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeRadialScaleSerializer<T> : GaugeScaleSerializerBase<T>
        where T : struct
    {
        private readonly IRadialScale<T> scale;

        public GaugeRadialScaleSerializer(IRadialScale<T> scale)
            : base(scale)
        {
            this.scale = scale;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            FluentDictionary.For(result)
                .Add("endAngle", scale.EndAngle, () => scale.EndAngle.HasValue)
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
