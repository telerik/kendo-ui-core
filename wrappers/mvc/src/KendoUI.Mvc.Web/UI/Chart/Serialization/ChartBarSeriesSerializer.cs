// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Extensions;

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
                .Add("stack", series.Stacked, false)
                .Add("gap", series.Gap, () => series.Gap.HasValue)
                .Add("spacing", series.Spacing, () => series.Spacing.HasValue)
                .Add("field", series.Member, () => { return series.Data == null && series.Member != null; })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("border", series.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", series.Color, () => series.Color.HasValue())
                .Add("overlay", series.Overlay, () => series.Overlay != null );

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