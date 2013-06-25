namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartRadarLineSeriesSerializerTests
    {
        protected ChartRadarLineSeries<SalesData, decimal> series;

        public ChartRadarLineSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartRadarLineSeries<SalesData, decimal>(s => s.RepSales);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("radarLine");
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
