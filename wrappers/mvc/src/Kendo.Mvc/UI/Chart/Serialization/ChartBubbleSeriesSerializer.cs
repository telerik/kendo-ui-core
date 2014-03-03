namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartBubbleSeriesSerializer : ChartScatterSeriesSerializer
    {
        private readonly IChartBubbleSeries series;

        public ChartBubbleSeriesSerializer(IChartBubbleSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "bubble";

            FluentDictionary.For(result)
                .Add("sizeField", series.SizeMember, () => series.SizeMember != null)
                .Add("colorField", series.ColorMember, () => series.ColorMember != null)
                .Add("categoryField", series.CategoryMember, () => series.CategoryMember != null)
                .Add("visibleInLegendField", series.VisibleInLegendMember, () => series.VisibleInLegendMember != null)
                .Add("minSize", series.MinSize, () => series.MinSize.HasValue)
                .Add("maxSize", series.MaxSize, () => series.MaxSize.HasValue);

            var negativeValuesData = series.NegativeValues.CreateSerializer().Serialize();
            if (negativeValuesData.Count > 0)
            {
                result.Add("negativeValues", negativeValuesData);
            }

            var borderData = series.Border.CreateSerializer().Serialize();
            if (borderData.Count > 0)
            {
                result.Add("border", borderData);
            }

            return result;
        }
    }
}