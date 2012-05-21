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
                .Add("startAngle", scale.StartAngle, () => scale.StartAngle.HasValue);

            return result;
        }
    }
}
