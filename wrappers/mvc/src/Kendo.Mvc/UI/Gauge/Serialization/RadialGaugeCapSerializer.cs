namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class RadialGaugeCapSerializer : IChartSerializer
    {
        private readonly RadialGaugeCap cap;

        public RadialGaugeCapSerializer(RadialGaugeCap cap)
        {
            this.cap = cap;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("color", cap.Color, () => cap.Color.HasValue())
                .Add("opacity", cap.Opacity, () => cap.Opacity.HasValue)
                .Add("size", cap.Size, () => cap.Size.HasValue);

            return result;
        }
    }
}