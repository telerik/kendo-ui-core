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

            if (series.ErrorBars.LowMember.HasValue() && series.ErrorBars.HighMember.HasValue())
            {
                result["errorLowField"] = series.ErrorBars.LowMember;
                result["errorHighField"] = series.ErrorBars.HighMember;
            }

            return result;
        }
    }
}