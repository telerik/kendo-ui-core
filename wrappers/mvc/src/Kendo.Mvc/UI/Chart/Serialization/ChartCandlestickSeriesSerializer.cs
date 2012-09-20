namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartCandlestickSeriesSerializer : ChartOHLCSeriesSerializer
    {
        private readonly IChartCandlestickSeries series;

        public ChartCandlestickSeriesSerializer(IChartCandlestickSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("type", series.Type)
                .Add("baseColorField", series.BaseColorMember, () => series.BaseColorMember.HasValue());

            if (series.Overlay != null) 
            { 
                result.Add("overlay", series.Overlay.CreateSerializer().Serialize());
            }

            return result;
        }
    }
}