namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarScatterSeriesSerializer : ChartScatterSeriesSerializer
    {
        public ChartPolarScatterSeriesSerializer(IChartScatterSeries series)
            : base(series)
        {
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "polarScatter";

            return result;
        }
    }
}