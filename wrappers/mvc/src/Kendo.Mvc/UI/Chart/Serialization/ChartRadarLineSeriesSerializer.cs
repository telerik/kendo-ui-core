namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarLineSeriesSerializer : ChartLineSeriesSerializer
    {
        public ChartRadarLineSeriesSerializer(IChartLineSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "radarLine";

            return result;
        }
    }
}