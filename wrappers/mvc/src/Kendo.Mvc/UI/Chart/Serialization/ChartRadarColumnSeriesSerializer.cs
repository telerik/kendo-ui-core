namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarColumnSeriesSerializer : ChartBarSeriesSerializer
    {
        public ChartRadarColumnSeriesSerializer(IChartBarSeries series)
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