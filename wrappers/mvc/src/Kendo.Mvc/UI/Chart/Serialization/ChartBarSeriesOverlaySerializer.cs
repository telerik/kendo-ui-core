namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartBarSeriesOverlaySerializer : IChartSerializer
    {
        private readonly ChartBarSeriesOverlay overlay;

        public ChartBarSeriesOverlaySerializer(ChartBarSeriesOverlay overlay)
        {
            this.overlay = overlay;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("gradient", overlay.Gradient.ToString().ToLowerInvariant());

            return result;
        }
    }
}