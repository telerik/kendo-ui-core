namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartScatterLineSeriesSerializer : ChartScatterSeriesSerializer
    {
        private readonly IChartScatterLineSeries series;

        public ChartScatterLineSeriesSerializer(IChartScatterLineSeries series)
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