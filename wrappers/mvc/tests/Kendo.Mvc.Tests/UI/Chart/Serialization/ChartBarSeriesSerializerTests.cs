namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartBarSeriesSerializerTests
    {
        protected ChartBarSeries<SalesData, decimal> series;

        public ChartBarSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartBarSeries<SalesData, decimal>(s => s.RepSales, s => s.Color);
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
        public void Should_serialize_field_if_member_is_set()
        {
            series.Member = "RepSales";
            GetJson(series)["field"].ShouldEqual("RepSales");
        }

        [Fact]
        public void Should_not_serialize_field_if_member_is_not_set()
        {
            series.Member = null;
            GetJson(series).ContainsKey("field").ShouldBeFalse();
        }
        [Fact]
        public void Bar_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("bar");
        }

        [Fact]
        public void Bar_serializes_type_for_vertical_orientation()
        {
            series.Orientation = ChartSeriesOrientation.Vertical;
            GetJson(series)["type"].ShouldEqual("column");
        }

        [Fact]
        public void Bar_serializes_stack()
        {
            series.Stacked = true;
            GetJson(series)["stack"].ShouldEqual(true);
        }

        [Fact]
        public void Bar_serializes_stack_name()
        {
            series.StackName = "Female";
            GetJson(series)["stack"].ShouldEqual("Female");
        }

        [Fact]
        public void Bar_should_not_serialize_default_stack()
        {
            GetJson(series).ContainsKey("stack").ShouldBeFalse();
        }

        [Fact]
        public void Bar_serializes_aggregate()
        {
            series.Aggregate = ChartSeriesAggregate.Max;
            GetJson(series)["aggregate"].ShouldEqual("max");
        }

        [Fact]
        public void Bar_should_not_serialize_default_aggregate()
        {
            GetJson(series).ContainsKey("aggregate").ShouldBeFalse();
        }

        [Fact]
        public void Bar_serializes_gap()
        {
            series.Gap = 1;
            GetJson(series)["gap"].ShouldEqual(1.0);
        }

        [Fact]
        public void Bar_should_not_seriale_default_gap()
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
        public void Spacing_should_not_seriale_default_spacing()
        {
            GetJson(series).ContainsKey("spacing").ShouldBeFalse();
        }

        [Fact]
        public void Bar_should_serialize_label_settings()
        {
            series.Labels.Visible = true;
            GetJson(series).ContainsKey("labels").ShouldEqual(true);
        }

        [Fact]
        public void Bar_should_not_serialize_label_settings_by_default()
        {
            GetJson(series).ContainsKey("labels").ShouldEqual(false);
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
        public void Serializes_negative_color()
        {
            series.NegativeColor = "Blue";
            GetJson(series)["negativeColor"].ShouldEqual("Blue");
        }

        [Fact]
        public void Does_not_serialize_default_negative_color()
        {
            GetJson(series).ContainsKey("negativeColor").ShouldBeFalse();
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
    }
}
