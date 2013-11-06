namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartAreaSeriesSerializer : ChartAreaSeriesSerializerBase
    {
        protected readonly IChartAreaSeries series;

        public ChartAreaSeriesSerializer(IChartAreaSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            var line = series.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
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