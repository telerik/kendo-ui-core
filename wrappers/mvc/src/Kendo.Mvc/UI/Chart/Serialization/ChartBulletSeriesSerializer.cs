namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartBulletSeriesSerializer : IChartSerializer
    {
        private readonly IChartBulletSeries series;

        public ChartBulletSeriesSerializer(IChartBulletSeries series)
        {
            this.series = series;
        }

        public IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("type", series.Orientation == ChartSeriesOrientation.Horizontal ? "bullet" : "verticalBullet")
                .Add("gap", series.Gap, () => series.Gap.HasValue)
                .Add("spacing", series.Spacing, () => series.Spacing.HasValue)
                .Add("targetField", series.TargetMember, () => { return series.Data == null && series.TargetMember != null; })
                .Add("currentField", series.CurrentMember, () => { return series.Data == null && series.CurrentMember != null; })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", series.Color, () => series.Color.HasValue())
                .Add("name", series.Name, string.Empty)
                .Add("opacity", series.Opacity, () => series.Opacity.HasValue)
                .Add("axis", series.Axis, string.Empty)
                .Add("colorField", series.ColorMember, () => series.ColorMember.HasValue());

            if (series.Overlay != null)
            {
                result.Add("overlay", series.Overlay.CreateSerializer().Serialize());
            }

            var tooltipData = series.Tooltip.CreateSerializer().Serialize();
            if (tooltipData.Count > 0)
            {
                result.Add("tooltip", tooltipData);
            }

            var targetData = series.Target.CreateSerializer().Serialize();
            if (targetData.Count > 0)
            {
                result.Add("target", targetData);
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