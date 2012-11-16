namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartCandlestickSeriesSerializerTests
    {
        protected ChartCandlestickSeries<OHLCData, decimal> series;

        public ChartCandlestickSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<OHLCData>();
            chart.Data = OHLCDataBuilder.GetCollection();
            series = new ChartCandlestickSeries<OHLCData, decimal>(d => d.Open, d => d.High, d => d.Low, d => d.Close, d => d.Color, d => d.DownColor);
        }

        [Fact]
        public void Serializes_name()
        {
            series.Name = "SeriesA";
            GetJson(series)["name"].ShouldEqual("SeriesA");
        }

        [Fact]
        public void Should_not_serialize_empty_name()
        {
            series.Name = string.Empty;
            GetJson(series).ContainsKey("name").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_groupNameTemplate()
        {
            series.GroupNameTemplate = "#= series.name #";
            GetJson(series)["groupNameTemplate"].ShouldEqual("#= series.name #");
        }

        [Fact]
        public void Should_not_serialize_empty_groupNameTemplate()
        {
            series.GroupNameTemplate = string.Empty;
            GetJson(series).ContainsKey("groupNameTemplate").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_opacity()
        {
            series.Opacity = 0.5;
            GetJson(series)["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Should_not_serialize_default_opacity()
        {
            GetJson(series).ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_axis()
        {
            series.Axis = "Axis";
            GetJson(series)["axis"].ShouldEqual("Axis");
        }

        [Fact]
        public void Should_not_serialize_empty_axis()
        {
            series.Axis = string.Empty;
            GetJson(series).ContainsKey("axis").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Tooltip()
        {
            series.Tooltip.Visible = true;
            GetJson(series).ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_tooltip()
        {
            GetJson(series).ContainsKey("tooltip").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
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
