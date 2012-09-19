namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartOHLCSeriesSerializerTests
    {
        private IChartOHLCSeries series;

        public ChartOHLCSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<OHLCData>();
            chart.Data = OHLCDataBuilder.GetCollection();
            series = new ChartOHLCSeries<OHLCData, decimal>(chart, s => s.Open, s => s.High, s => s.Low, s => s.Close, s => s.Color, s => s.BaseColor);
        }

        [Fact]
        public void Type_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("ohlc");
        }

        [Fact]
        public void Serializes_aggregates()
        {
            series.Aggregates.Open = ChartSeriesAggregate.Max;
            series.Aggregates.High = ChartSeriesAggregate.Max;
            series.Aggregates.Low = ChartSeriesAggregate.Max;
            series.Aggregates.Close = ChartSeriesAggregate.Max;
            ((Dictionary<string, object>)GetJson(series)["aggregates"])["open"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregates"])["high"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregates"])["low"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregates"])["close"].ShouldEqual("max");
        }

        [Fact]
        public void Should_not_serialize_default_aggregates()
        {
            GetJson(series).ContainsKey("aggregates").ShouldBeFalse();
        }

        [Fact]
        public void Gap_serializes_gap()
        {
            series.Gap = 1;
            GetJson(series)["gap"].ShouldEqual(1.0);
        }

        [Fact]
        public void Should_not_seriale_default_gap()
        {
            GetJson(series).ContainsKey("gap").ShouldBeFalse();
        }

        [Fact]
        public void Spacing_serializes_Spacing()
        {
            series.Spacing = 1;
            GetJson(series)["spacing"].ShouldEqual(1.0);
        }

        [Fact]
        public void Spacing_not_seriale_default_spacing()
        {
            GetJson(series).ContainsKey("spacing").ShouldBeFalse();
        }

        [Fact]
        public void Spacing_serializes_spacing()
        {
            series.Spacing = 1;
            GetJson(series)["spacing"].ShouldEqual(1.0);
        }

        [Fact]
        public void Spacing_should_not_seriale_default_spacing()
        {
            GetJson(series).ContainsKey("spacing").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            series.Border.Color = "red";
            series.Border.Width = 1;
            series.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson(series)["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson(series)["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson(series)["border"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson(series).ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Line_serializes_line()
        {
            series.Line.Color = "red";
            series.Line.Width = 1;
            series.Line.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson(series)["line"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson(series)["line"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson(series)["line"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_line()
        {
            GetJson(series).ContainsKey("line").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            series.Color = "Blue";
            GetJson(series)["color"].ShouldEqual("Blue");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson(series).ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_open_field_if_open_member_is_set()
        {
            series.OpenMember = "open";
            GetJson(series)["openField"].ShouldEqual("open");
        }

        [Fact]
        public void Should_not_serialize_open_field_if_open_member_is_not_set()
        {
            series.OpenMember = null;
            GetJson(series).ContainsKey("openField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_high_field_if_high_member_is_set()
        {
            series.HighMember = "high";
            GetJson(series)["highField"].ShouldEqual("high");
        }

        [Fact]
        public void Should_not_serialize_high_field_if_high_member_is_not_set()
        {
            series.HighMember = null;
            GetJson(series).ContainsKey("highField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_low_field_if_low_member_is_set()
        {
            series.LowMember = "low";
            GetJson(series)["lowField"].ShouldEqual("low");
        }

        [Fact]
        public void Should_not_serialize_low_field_if_low_member_is_not_set()
        {
            series.LowMember = null;
            GetJson(series).ContainsKey("lowField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_close_field_if_close_member_is_set()
        {
            series.CloseMember = "close";
            GetJson(series)["closeField"].ShouldEqual("close");
        }

        [Fact]
        public void Should_not_serialize_close_field_if_close_member_is_not_set()
        {
            series.CloseMember = null;
            GetJson(series).ContainsKey("closeField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_color_field_if_color_member_is_set()
        {
            series.ColorMember = "Color";
            GetJson(series)["colorField"].ShouldEqual("Color");
        }

        [Fact]
        public void Should_not_serialize_color_field_if_color_member_is_not_set()
        {
            series.ColorMember = null;
            GetJson(series).ContainsKey("colorField").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartOHLCSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}