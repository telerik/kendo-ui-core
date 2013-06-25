namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarLineSeriesSerializer : ChartScatterSeriesSerializer
    {
        public ChartPolarLineSeriesSerializer(IChartScatterSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "polarLine";

            return result;
        }
    }
}