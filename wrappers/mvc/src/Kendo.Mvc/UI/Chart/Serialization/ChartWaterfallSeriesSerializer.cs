namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartWaterfallSeriesSerializer : ChartBarSeriesSerializerBase
    {
        private readonly IWaterfallSeries series;

        public ChartWaterfallSeriesSerializer(IWaterfallSeries series)
            : base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("summaryField", series.SummaryMember, () => series.SummaryMember != null);

            return result;
        }
    }
}