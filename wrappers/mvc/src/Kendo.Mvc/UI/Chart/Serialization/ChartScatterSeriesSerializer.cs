namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartScatterSeriesSerializer : ChartScatterSeriesSerializerBase
    {
        private readonly IChartScatterSeries series;

        public ChartScatterSeriesSerializer(IChartScatterSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            var errorBars = series.ErrorBars.CreateSerializer().Serialize();
            if (errorBars.Count > 0)
            {
                result.Add("errorBars", errorBars);
            }

            return result;
        }
    }
}