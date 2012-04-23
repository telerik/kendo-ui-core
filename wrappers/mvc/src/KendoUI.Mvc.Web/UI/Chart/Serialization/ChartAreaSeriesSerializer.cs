// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Extensions;

    internal class ChartAreaSeriesSerializer : ChartSeriesSerializerBase
    {
        private readonly IChartAreaSeries series;

        public ChartAreaSeriesSerializer(IChartAreaSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Orientation == ChartSeriesOrientation.Horizontal ? "area" : "verticalArea")
                .Add("stack", series.Stacked, false)
                .Add("field", series.Member, () => { return series.Data == null && series.Member.HasValue(); })
                .Add("data", series.Data, () => { return series.Data != null; })
                .Add("color", series.Color, () => series.Color.HasValue())
                .Add("missingValues", series.MissingValues.ToString().ToLowerInvariant(),
                                      () => series.MissingValues.HasValue);

            var labelsData = series.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            var markers = series.Markers.CreateSerializer().Serialize();
            if (markers.Count > 0)
            {
                result.Add("markers", markers);
            }

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }
    }
}