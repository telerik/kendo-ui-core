namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartElementBorderSerializer : IChartSerializer
    {
        private readonly ChartElementBorder border;

        public ChartElementBorderSerializer(ChartElementBorder border)
        {
            this.border = border;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("width", border.Width, () => border.Width.HasValue)
                .Add("opacity", border.Opacity, () => border.Opacity.HasValue)
                .Add("dashType", border.DashType.ToString().ToLowerInvariant(), () => border.DashType.HasValue)
                .Add("color", border.Color, () => border.Color.HasValue());

            return result;
        }
    }
}