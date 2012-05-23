namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeLinearScaleSerializer<T> : GaugeScaleSerializerBase<T>
        where T : struct 
    {
        private readonly ILinearScale<T> scale;

        public GaugeLinearScaleSerializer(ILinearScale<T> scale)
            : base(scale)
        {
            this.scale = scale;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            FluentDictionary.For(result)
                .Add("mirror", scale.Mirror, () => scale.Mirror.HasValue)
                .Add("vertical", scale.Vertical, () => scale.Vertical.HasValue);

            var labelsData = scale.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            return result;
        }
    }
}
