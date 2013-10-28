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

        [Fact]
        public void Serializes_Style()
        {
            series.Style = ChartRadarLineStyle.Smooth;
            GetJson(series)["style"].ShouldEqual("smooth");
        }

        [Fact]
        public void Should_not_serialize_default_Style()
        {
            GetJson(series).ContainsKey("style").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
