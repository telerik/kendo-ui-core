namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartPaneSerializer : IChartSerializer
    {
        private readonly ChartPane pane;

        public ChartPaneSerializer(ChartPane pane)
        {
            this.pane = pane;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("name", pane.Name, () => pane.Name.HasValue())
                .Add("height", pane.Height, () => pane.Height.HasValue)
                .Add("background", pane.Background, () => pane.Background.HasValue());

            var titleData = pane.Title.CreateSerializer().Serialize();
            if (titleData.Count > 0) {
                result.Add("title", titleData);
            }

            var marginData = pane.Margin.CreateSerializer().Serialize();
            if (marginData.Count > 0)
            {
                result.Add("margin", marginData);
            }

            var paddingData = pane.Padding.CreateSerializer().Serialize();
            if (paddingData.Count > 0)
            {
                result.Add("padding", paddingData);
            }

            var borderData = pane.Border.CreateSerializer().Serialize();
            if (borderData.Count > 0)
            {
                result.Add("border", borderData);
            }

            return result;
        }
    }
}