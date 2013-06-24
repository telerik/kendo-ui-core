namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartRadarAreaSeriesSerializer : ChartAreaSeriesSerializer
    {
        public ChartRadarAreaSeriesSerializer(IChartAreaSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "radarArea";

            return result;
        }
    }
}