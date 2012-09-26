namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartOHLCSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartOHLCSeries series;

        public ChartOHLCSeriesSerializer(IChartOHLCSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Type)
                .Add("aggregates", series.Aggregates.CreateSerializer().Serialize(), ShouldSerializeAggregates)
                .Add("gap", series.Gap, () => series.Gap.HasValue)
                .Add("spacing", series.Spacing, () => series.Spacing.HasValue)
                .Add("axis", series.Axis, () => series.Axis.HasValue())
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", series.Color, () => series.Color.HasValue())
                .Add("colorField", series.ColorMember, () => series.ColorMember.HasValue())
                .Add("openField", series.OpenMember, () => series.OpenMember.HasValue())
                .Add("highField", series.HighMember, () => series.HighMember.HasValue())
                .Add("lowField", series.LowMember, () => series.LowMember.HasValue())
                .Add("closeField", series.CloseMember, () => series.CloseMember.HasValue());

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }

        private bool ShouldSerializeBorder()
        {
            return series.Border.Color.HasValue() ||
                   series.Border.Width.HasValue ||
                   series.Border.DashType.HasValue;
        }

        private bool ShouldSerializeAggregates()
        {
            return series.Aggregates.Open.HasValue ||
                   series.Aggregates.High.HasValue ||
                   series.Aggregates.Low.HasValue ||
                   series.Aggregates.Close.HasValue;
        }
    }
}