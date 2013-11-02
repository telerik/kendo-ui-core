namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

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

            if (series.XErrorLowMember.HasValue() && series.XErrorHighMember.HasValue())
            {
                result["xErrorLowField"] = series.XErrorLowMember;
                result["xErrorHighField"] = series.XErrorHighMember;
            }

            if (series.YErrorLowMember.HasValue() && series.YErrorHighMember.HasValue())
            {
                result["yErrorLowField"] = series.YErrorLowMember;
                result["yErrorHighField"] = series.YErrorHighMember;
            }

            return result;
        }
    }
}