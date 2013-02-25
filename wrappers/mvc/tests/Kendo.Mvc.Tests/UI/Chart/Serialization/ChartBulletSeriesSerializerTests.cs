namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartBulletSeriesSerializerTests
    {
        protected ChartBulletSeries<SalesData, decimal, decimal> series;

        public ChartBulletSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartBulletSeries<SalesData, decimal, decimal>(s => s.RepSales, s => s.TotalSales, s => s.Color);
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
        public void Should_serialize_data_if_set()
        {
            series.Data = new decimal[] { default(decimal) };
            (GetJson(series)["data"] is IEnumerable).ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_data_if_not_set()
        {
            series.Data = null;
            GetJson(series).ContainsKey("data").ShouldBeFalse();
        }

        [Fact]
        public void Bullet_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("bullet");
        }

        [Fact]
        public void Vertical_Bullet_serializes_type()
        {
            series.Orientation = ChartSeriesOrientation.Vertical;
            GetJson(series)["type"].ShouldEqual("verticalBullet");
        }

        [Fact]
        public void Bullet_serializes_gap()
        {
            series.Gap = 1;
            GetJson(series)["gap"].ShouldEqual(1.0);
        }

        [Fact]
        public void Bullet_should_not_serialze_default_gap()
        {
            GetJson(series).ContainsKey("gap").ShouldBeFalse();
        }

        [Fact]
        public void Spacing_serializes_spacing()
        {
            series.Spacing = 1;
            GetJson(series)["spacing"].ShouldEqual(1.0);
        }

        [Fact]
        public void Spacing_should_not_serialize_default_spacing()
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
        public void Bar_serializes_overlay()
        {
            series.Overlay = ChartBarSeriesOverlay.None;
            ((Dictionary<string, object>)GetJson(series)["overlay"])["gradient"].ShouldEqual("none");
        }

        [Fact]
        public void Bar_should_not_serialize_default_overlay()
        {
            GetJson(series).ContainsKey("overlay").ShouldBeFalse();
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

        [Fact]
        public void Should_serialize_current_field_if_current_member_is_set()
        {
            series.CurrentMember = "currentField";
            GetJson(series)["currentField"].ShouldEqual("currentField");
        }

        [Fact]
        public void Should_not_serialize_current_field_if_current_member_is_not_set()
        {
            series.CurrentMember = null;
            GetJson(series).ContainsKey("currentField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_target_field_if_target_member_is_set()
        {
            series.TargetMember = "targetField";
            GetJson(series)["targetField"].ShouldEqual("targetField");
        }

        [Fact]
        public void Should_not_serialize_target_field_if_target_member_is_not_set()
        {
            series.TargetMember = null;
            GetJson(series).ContainsKey("targetField").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_target()
        {
            series.Target.Color = "red";
            series.Target.Width = 1;
            series.Target.Border.Color = "red";
            series.Target.Border.Width = 1;
            series.Target.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson(series)["target"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson(series)["target"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)((Dictionary<string, object>)GetJson(series)["target"])["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)((Dictionary<string, object>)GetJson(series)["target"])["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)((Dictionary<string, object>)GetJson(series)["target"])["border"])["dashType"].ShouldEqual("dot");
        }
    }
}