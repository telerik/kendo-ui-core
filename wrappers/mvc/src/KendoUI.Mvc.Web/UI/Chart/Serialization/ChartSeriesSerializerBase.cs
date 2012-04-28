namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

    internal abstract class ChartSeriesSerializerBase : IChartSerializer
    {
        private readonly IChartSeries series;

        public ChartSeriesSerializerBase(IChartSeries series)
        {
            this.series = series;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            FluentDictionary.For(result)
                  .Add("name", series.Name, string.Empty)
                  .Add("opacity", series.Opacity, () => series.Opacity.HasValue)
                  .Add("axis", series.Axis, string.Empty);

            var tooltipData = series.Tooltip.CreateSerializer().Serialize();
            if (tooltipData.Count > 0) {
                  result.Add("tooltip", tooltipData);
            }

            return result;
        }
    }
}
