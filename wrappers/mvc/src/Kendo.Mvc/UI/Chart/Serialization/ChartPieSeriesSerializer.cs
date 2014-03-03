using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    internal class ChartPieSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartPieSeries series;

        public ChartPieSeriesSerializer(IChartPieSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Type)
                .Add("field", series.Member, () => series.Member != null)
                .Add("categoryField", series.CategoryMember, () => series.CategoryMember != null)
                .Add("explodeField", series.ExplodeMember, () => series.ExplodeMember != null)
                .Add("colorField", series.ColorMember, () => series.ColorMember != null)
                .Add("visibleInLegendField", series.VisibleInLegendMember, () => series.VisibleInLegendMember != null)
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("padding", series.Padding, () => series.Padding.HasValue)
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("startAngle", series.StartAngle, () => series.StartAngle.HasValue);

            if (series.Overlay != null)
            {
                result.Add("overlay", series.Overlay.Value);
            }

            var labelsData = series.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            var connectors = series.Connectors.CreateSerializer().Serialize();
            if (connectors.Count > 0)
            {
                result.Add("connectors", connectors);
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