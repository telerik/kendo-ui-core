namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarColumnSeriesSerializer : ChartBarSeriesSerializerBase
    {
        public ChartRadarColumnSeriesSerializer(IChartRadarColumnSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "radarColumn";

            return result;
        }
    }
}