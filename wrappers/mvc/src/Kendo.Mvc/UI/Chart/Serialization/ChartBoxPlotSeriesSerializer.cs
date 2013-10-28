namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartBoxPlotSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartBoxPlotSeries series;

        public ChartBoxPlotSeriesSerializer(IChartBoxPlotSeries series)
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
                .Add("colorField", series.ColorMember, () => series.ColorMember.HasValue())
                .Add("lowerField", series.LowerMember, () => series.LowerMember.HasValue())
                .Add("q1Field", series.Q1Member, () => series.Q1Member.HasValue())
                .Add("medianField", series.MedianMember, () => series.MedianMember.HasValue())
                .Add("q3Field", series.Q3Member, () => series.Q3Member.HasValue())
                .Add("upperField", series.UpperMember, () => series.UpperMember.HasValue())
                .Add("meanField", series.MeanMember, () => series.MeanMember.HasValue())
                .Add("outliersField", series.OutliersMember, () => series.OutliersMember.HasValue())
                .Add("categoryField", series.CategoryMember, () => { return series.Data == null && series.CategoryMember.HasValue(); })
                .Add("noteTextField", series.NoteTextMember, () => series.NoteTextMember.HasValue());

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            var outliers = series.Outliers.CreateSerializer().Serialize();
            if (outliers.Count > 0)
            {
                result.Add("outliers", outliers);
            }

            var extremes = series.Extremes.CreateSerializer().Serialize();
            if (extremes.Count > 0)
            {
                result.Add("extremes", extremes);
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
            return series.Aggregates.Lower.HasValue ||
                   series.Aggregates.Q1.HasValue ||
                   series.Aggregates.Median.HasValue ||
                   series.Aggregates.Q3.HasValue ||
                   series.Aggregates.Upper.HasValue;
        }
    }
}