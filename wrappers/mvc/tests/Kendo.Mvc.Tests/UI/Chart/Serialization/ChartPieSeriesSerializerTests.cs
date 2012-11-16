namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using System.Linq;

    public class ChartPieSeriesSerializerTests
    {
        protected ChartPieSeries<SalesData, decimal> series;

        public ChartPieSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartPieSeries<SalesData, decimal>(s => s.RepSales, s => s.RepName, s => s.Color, s => s.Explode, s => s.VisibleInLegend);
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
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("pie");
        }

        [Fact]
        public void Serializes_padding()
        {
            series.Padding = 80;
            GetJson(series)["padding"].ShouldEqual(80);
        }

        [Fact]
        public void Should_not_serialize_default_padding()
        {
            GetJson(series).ContainsKey("padding").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_StartAngle()
        {
            series.StartAngle = 2;
            GetJson(series)["startAngle"].ShouldEqual(2);
        }

        [Fact]
        public void Should_not_serialize_default_width()
        {
            GetJson(series).ContainsKey("startAngle").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_data_if_set()
        {
            series.Data = new SalesData[] { new SalesData() };
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
        public void Should_serialize_categoryField_if_category_member_is_set()
        {
            series.CategoryMember = "RepName";
            GetJson(series)["categoryField"].ShouldEqual("RepName");
        }

        [Fact]
        public void Should_not_serialize_categoryField_if_category_member_is_not_set()
        {
            series.CategoryMember = null;
            GetJson(series).ContainsKey("categoryField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_visibleInLegendField_if_visibleInLegend_member_is_set()
        {
            series.VisibleInLegendMember = "ViisibleInLegendFieldName";
            GetJson(series)["visibleInLegendField"].ShouldEqual("ViisibleInLegendFieldName");
        }

        [Fact]
        public void Should_not_serialize_visibleInLegendField_if_visibleInLegend_member_is_not_set()
        {
            series.VisibleInLegendMember = null;
            GetJson(series).ContainsKey("visibleInLegendField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_colorField_if_color_member_is_set()
        {
            series.ColorMember = "Color";
            GetJson(series)["colorField"].ShouldEqual("Color");
        }

        [Fact]
        public void Should_not_serialize_colorField_if_color_member_is_not_set()
        {
            series.ColorMember = null;
            GetJson(series).ContainsKey("colorField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_explodeField_if_explode_member_is_set()
        {
            series.ExplodeMember = "Explode";
            GetJson(series)["explodeField"].ShouldEqual("Explode");
        }

        [Fact]
        public void Should_not_serialize_explodeField_if_explode_member_is_not_set()
        {
            series.ExplodeMember = null;
            GetJson(series).ContainsKey("explodeField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_label_settings()
        {
            series.Labels.Visible = true;
            GetJson(series).ContainsKey("labels").ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_label_settings_by_default()
        {
            GetJson(series).ContainsKey("labels").ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson(series).ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_overlay()
        {
            series.Overlay = ChartPieSeriesOverlay.None;
            GetJson(series).ContainsKey("overlay").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_overlay()
        {
            GetJson(series).ContainsKey("overlay").ShouldBeFalse();
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
    }
}
