namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarAreaSeriesSerializer : ChartAreaSeriesSerializerBase
    {
        protected readonly IChartRadarAreaSeries series;

        public ChartRadarAreaSeriesSerializer(IChartRadarAreaSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "radarArea";

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }
    }
}