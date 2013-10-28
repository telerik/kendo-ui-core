using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    internal abstract class ChartScatterLineSeriesSerializerBase : ChartScatterSeriesSerializerBase
    {
        private readonly IScatterLineSeries series;

        public ChartScatterLineSeriesSerializerBase(IScatterLineSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", "scatterLine")
                .Add("width", series.Width, () => series.Width.HasValue)
                .Add("dashType", series.DashType.ToString().ToLowerInvariant(), () => series.DashType.HasValue)
                .Add("missingValues", series.MissingValues.ToString().ToLowerInvariant(),
                                      () => series.MissingValues.HasValue);

            return result;
        }
    }
}
