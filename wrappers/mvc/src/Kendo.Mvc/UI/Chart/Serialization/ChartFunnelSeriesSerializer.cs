using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    internal class ChartFunnelSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartFunnelSeries series;

        public ChartFunnelSeriesSerializer(IChartFunnelSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Type)
                .Add("dynamicHeight", series.DynamicHeight)
                .Add("dynamicSlope", series.DynamicSlope)
                .Add("neckRatio", series.NeckRatio)
                .Add("segmentSpacing",series.SegmentSpacing)
                .Add("field", series.Member, () => { return series.Data == null && series.Member != null; })
                .Add("categoryField", series.CategoryMember, () => { return series.Data == null && series.CategoryMember != null; })
                .Add("colorField", series.ColorMember, () => { return series.Data == null && series.ColorMember != null; })
                .Add("visibleInLegendField", series.VisibleInLegendMember, () => { return series.Data == null && series.VisibleInLegendMember != null; })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder);


            var labelsData = series.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            return result;
        }

        private bool ShouldSerializeBorder()
        {
            return series.Border.Color.HasValue() ||
                   series.Border.Width.HasValue ||
                   series.Border.DashType.HasValue;
        }
    }
}