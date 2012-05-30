namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class GaugeScaleTicksSerializer : IChartSerializer
    {
        private readonly GaugeScaleTicks ticks;

        public GaugeScaleTicksSerializer(GaugeScaleTicks ticks)
        {
            this.ticks = ticks;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("size", ticks.Size, () => ticks.Size.HasValue)
                .Add("width", ticks.Width, () => ticks.Width.HasValue)
                .Add("dashType", ticks.DashType.ToString().ToLowerInvariant(), () => ticks.DashType.HasValue)
                .Add("visible", ticks.Visible, () => ticks.Visible.HasValue)
                .Add("color", ticks.Color, () => ticks.Color.HasValue());

            return result;
        }
    }
}