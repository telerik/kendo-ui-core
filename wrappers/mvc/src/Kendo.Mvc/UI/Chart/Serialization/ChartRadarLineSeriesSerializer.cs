namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarLineSeriesSerializer : ChartLineSeriesSerializerBase
    {
        private readonly IChartRadarLineSeries series;

        public ChartRadarLineSeriesSerializer(IChartRadarLineSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "radarLine";

            if (series.Style != ChartRadarLineStyle.Normal)
            {
                result["style"] = series.Style.ToString().ToLowerInvariant();
            }

            return result;
        }
    }
}