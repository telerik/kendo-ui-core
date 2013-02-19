namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartBarSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartBarSeries series;

        public ChartBarSeriesSerializer(IChartBarSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Orientation == ChartSeriesOrientation.Horizontal ? "bar" : "column")
                .Add("stack", series.Stacked, () => series.Stacked == true && !series.StackName.HasValue())
                .Add("stack", series.StackName, () => series.StackName.HasValue())
                .Add("aggregate", series.Aggregate.ToString().ToLowerInvariant(), () => series.Aggregate != null)
                .Add("gap", series.Gap, () => series.Gap.HasValue)
                .Add("spacing", series.Spacing, () => series.Spacing.HasValue)
                .Add("field", series.Member, () => { return series.Data == null && series.Member != null; })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", series.Color, () => series.Color.HasValue())
                .Add("colorField", series.ColorMember, () => series.ColorMember.HasValue())
                .Add("negativeColor", series.NegativeColor, () => series.NegativeColor.HasValue());

            if (series.Overlay != null)
            {
                result.Add("overlay", series.Overlay.CreateSerializer().Serialize());
            }

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