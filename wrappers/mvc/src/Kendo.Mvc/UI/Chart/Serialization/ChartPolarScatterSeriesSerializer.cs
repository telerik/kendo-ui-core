namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarScatterSeriesSerializer : ChartScatterSeriesSerializerBase
    {
        public ChartPolarScatterSeriesSerializer(IChartPolarScatterSeries series)
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