namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class PlotAreaSerializer : IChartSerializer
    {
        private readonly PlotArea plotArea;

        public PlotAreaSerializer(PlotArea plotArea)
        {
            this.plotArea = plotArea;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("background", plotArea.Background, () => plotArea.Background.HasValue())
                .Add("opacity", plotArea.Opacity, () => plotArea.Opacity.HasValue)
                .Add("margin", plotArea.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("border", plotArea.Border.CreateSerializer().Serialize(), ShouldSerializeBorder);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return plotArea.Margin.Top.HasValue ||
                   plotArea.Margin.Right.HasValue ||
                   plotArea.Margin.Bottom.HasValue ||
                   plotArea.Margin.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return plotArea.Border.Color.HasValue() ||
                   plotArea.Border.Width.HasValue ||
                   plotArea.Border.DashType.HasValue;
        }
    }
}