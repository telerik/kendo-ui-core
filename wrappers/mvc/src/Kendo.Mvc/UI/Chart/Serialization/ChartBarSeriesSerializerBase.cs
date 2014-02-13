using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    internal class ChartBarSeriesSerializerBase : ChartSeriesSerializerBase
    {
        private readonly IBarSeries series;

        public ChartBarSeriesSerializerBase(IBarSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Orientation == ChartSeriesOrientation.Horizontal ? "bar" : "column")
                .Add("aggregate", series.Aggregate.ToString().ToLowerInvariant(), () => series.Aggregate != null)
                .Add("gap", series.Gap, () => series.Gap.HasValue)
                .Add("spacing", series.Spacing, () => series.Spacing.HasValue)
                .Add("field", series.Member, () => { return series.Data == null && series.Member != null; })
                .Add("categoryField", series.CategoryMember, () => { return series.Data == null && series.CategoryMember.HasValue(); })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("colorField", series.ColorMember, () => series.ColorMember.HasValue())
                .Add("noteTextField", series.NoteTextMember, () => series.NoteTextMember.HasValue())
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

            if (series.StackType.HasValue)
            {
                var type = series.StackType == ChartStackType.Stack100 ? "100%" : series.StackType.ToString().ToLowerInvariant();
                var stack = new Dictionary<string, object> { { "type", type } };

                if (series.StackGroup != null)
                {
                    stack.Add("group", series.StackGroup);
                }

                result.Add("stack", stack);
            }
            else if (series.StackGroup != null)
            {
                result.Add("stack", series.StackGroup);
            } if (series.Stacked.HasValue)
            {
                result.Add("stack", series.Stacked);
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
