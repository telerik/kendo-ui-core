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

            if (series.FromField != null)
            {
                result.Add("fromField", series.FromField);
            }

            if (series.ToField != null)
            {
                result.Add("toField", series.ToField);
            }

            var labelsData = series.RangeBarLabel.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            return result;
        } 
    }
}
