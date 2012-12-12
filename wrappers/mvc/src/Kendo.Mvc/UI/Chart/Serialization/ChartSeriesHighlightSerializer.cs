namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartSeriesHighlightSerializer : IChartSerializer
    {
        private readonly ChartSeriesHighlight highlight;

        public ChartSeriesHighlightSerializer(ChartSeriesHighlight highlight)
        {
            this.highlight = highlight;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("opacity", highlight.Opacity, () => highlight.Opacity.HasValue)
                .Add("color", highlight.Color, () => highlight.Color.HasValue());

            var borderData = highlight.Border.CreateSerializer().Serialize();
            if (borderData.Count > 0)
            {
                result.Add("border", borderData);
            }

            var lineData = highlight.Line.CreateSerializer().Serialize();
            if (lineData.Count > 0)
            {
                result.Add("line", lineData);
            }

            return result;
        }
    }
}