namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartCandlestickSeriesSerializerTests : ChartSeriesSerializerBaseTests<ChartCandlestickSeries<OHLCData, decimal>>
    {
        public ChartCandlestickSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<OHLCData>();
            chart.Data = OHLCDataBuilder.GetCollection();
            series = new ChartCandlestickSeries<OHLCData, decimal>(chart, d => d.Open, d => d.High, d => d.Low, d => d.Close, d => d.Color, d => d.DownColor);
        }

        [Fact]
        public void Type_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("candlestick");
        }

        [Fact]
        public void Should_serialize_color_field_if_color_member_is_set()
        {
            series.DownColorMember = "DownColor";
            GetJson(series)["downColorField"].ShouldEqual("DownColor");
        }

        [Fact]
        public void Should_not_serialize_color_field_if_color_member_is_not_set()
        {
            series.DownColorMember = null;
            GetJson(series).ContainsKey("downColorField").ShouldBeFalse();
        }

        [Fact]
        public void Overlay_serializes_overlay()
        {
            series.Overlay = ChartBarSeriesOverlay.None;
            ((Dictionary<string, object>)GetJson(series)["overlay"])["gradient"].ShouldEqual("none");
        }

        [Fact]
        public void Overlay_should_not_serialize_default_overlay()
        {
            GetJson(series).ContainsKey("overlay").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartCandlestickSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}