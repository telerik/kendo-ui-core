namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarLineSeriesSerializer : ChartScatterLineSeriesSerializerBase
    {
        private readonly IChartPolarLineSeries series;

        public ChartPolarLineSeriesSerializer(IChartPolarLineSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "polarLine";


            if (series.Style != ChartPolarLineStyle.Normal)
            {
                result["style"] = series.Style.ToString().ToLowerInvariant();
            }

            return result;
        }
    }
}