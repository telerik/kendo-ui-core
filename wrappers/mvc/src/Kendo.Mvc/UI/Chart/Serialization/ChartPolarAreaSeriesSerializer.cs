namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartPolarAreaSeriesSerializer : ChartScatterSeriesSerializerBase
    {
        private readonly IChartPolarAreaSeries series;

        public ChartPolarAreaSeriesSerializer(IChartPolarAreaSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            result["type"] = "polarArea";

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result["line"] = line;
            }


            return result;
        }
    }
}