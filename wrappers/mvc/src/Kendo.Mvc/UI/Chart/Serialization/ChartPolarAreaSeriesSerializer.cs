namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarAreaSeriesSerializer : ChartScatterSeriesSerializer
    {
        public ChartPolarAreaSeriesSerializer(IChartScatterSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "polarArea";

            return result;
        }
    }
}