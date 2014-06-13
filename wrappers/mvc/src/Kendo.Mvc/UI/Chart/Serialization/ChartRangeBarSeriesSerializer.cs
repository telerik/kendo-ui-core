namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartRangeBarSeriesSerializer : ChartBarSeriesSerializerBase
    {
        private readonly IChartRangeBarSeries series;

        public ChartRangeBarSeriesSerializer(IChartRangeBarSeries series)
            :base(series)
        {
            this.series = series;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            
            result["type"] = series.Orientation == ChartSeriesOrientation.Horizontal ? "rangeBar" : "rangeColumn";
            result.Add("fromField", series.FromField);
            result.Add("toField", series.ToField);

            return result;
        } 
    }
}
