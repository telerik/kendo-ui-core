namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartLineSeriesSerializer : ChartLineSeriesSerializerBase
    {
        private readonly IChartLineSeries series;

        public ChartLineSeriesSerializer(IChartLineSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (series.Style != ChartLineStyle.Normal)
            {
                result["style"] = series.Style.ToString().ToLowerInvariant();
            }               

            var errorBars = series.ErrorBars.CreateSerializer().Serialize();
            if (errorBars.Count > 0)
            {
                result.Add("errorBars", errorBars);
            }

            return result;
        }
    }
}