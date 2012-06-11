namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartAxisLabelsDateFormatsSerializer : IChartSerializer
    {
        private readonly ChartAxisLabelsDateFormats dateFormats;

        public ChartAxisLabelsDateFormatsSerializer(ChartAxisLabelsDateFormats dateFormats)
        {
            this.dateFormats = dateFormats;
        }

        public IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("hours", dateFormats.Hours, () => dateFormats.Hours != null)
                .Add("days", dateFormats.Days, () => dateFormats.Days != null)
                .Add("months", dateFormats.Months, () => dateFormats.Months != null)
                .Add("years", dateFormats.Years, () => dateFormats.Years != null);

            return result;
        }
    }
}