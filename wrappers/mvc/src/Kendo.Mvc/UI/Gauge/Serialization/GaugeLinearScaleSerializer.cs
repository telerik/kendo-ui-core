namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeLinearScaleSerializer : GaugeScaleSerializerBase
    {
        private readonly ILinearScale scale;

        public GaugeLinearScaleSerializer(ILinearScale scale)
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
