using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    internal class ChartDonutSeriesSerializer : ChartPieSeriesSerializer
    {
        private readonly IChartDonutSeries series;

        public ChartDonutSeriesSerializer(IChartDonutSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("margin", series.Margin, () => series.Margin.HasValue)
                .Add("holeSize", series.HoleSize, () => series.HoleSize.HasValue)
                .Add("size", series.Size, () => series.Size.HasValue);

            return result;
        }
    }
}