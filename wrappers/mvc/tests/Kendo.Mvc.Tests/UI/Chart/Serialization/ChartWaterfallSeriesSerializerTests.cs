namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartWaterfallSeriesSerializerTests
    {
        protected ChartWaterfallSeries<SalesData, decimal> series;

        public ChartWaterfallSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartWaterfallSeries<SalesData, decimal>(s => s.RepSales);
        }
        [Fact]
        public void Waterfall_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("waterfall");
        }

        [Fact]
        public void Waterfall_serializes_type_for_horizontal_orientation()
        {
            series.Orientation = ChartSeriesOrientation.Horizontal;
            GetJson(series)["type"].ShouldEqual("horizontalWaterfall");
        }

        [Fact]
        public void Should_serialize_summaryField_if_member_is_set()
        {
            series.SummaryMember = "foo";
            GetJson(series)["summaryField"].ShouldEqual("foo");
        }

        [Fact]
        public void Should_not_serialize_field_if_member_is_not_set()
        {
            GetJson(series).ContainsKey("summaryField").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
