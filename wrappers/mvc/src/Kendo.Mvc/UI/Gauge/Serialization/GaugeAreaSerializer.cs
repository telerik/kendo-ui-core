namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class GaugeAreaSerializer : IChartSerializer
    {
        private readonly GaugeArea gaugeArea;

        public GaugeAreaSerializer(GaugeArea chartArea)
        {
            this.gaugeArea = chartArea;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("background", gaugeArea.Background, () => gaugeArea.Background.HasValue())
                .Add("margin", gaugeArea.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("border", gaugeArea.Border.CreateSerializer().Serialize(), ShouldSerializeBorder);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return gaugeArea.Margin.Top.HasValue ||
                   gaugeArea.Margin.Right.HasValue ||
                   gaugeArea.Margin.Bottom.HasValue ||
                   gaugeArea.Margin.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return gaugeArea.Border.Color.HasValue() ||
                   gaugeArea.Border.Width.HasValue ||
                   gaugeArea.Border.DashType.HasValue;
        }
    }
}