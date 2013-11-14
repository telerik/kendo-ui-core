namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using System.Linq;

    public class ChartFunnelSeriesSerializerTests
    {
        ChartFunnelSeries<SalesData, decimal> series;
        public ChartFunnelSeriesSerializerTests()
        {
            series = new ChartFunnelSeries<SalesData, decimal>(s => s.RepSales, s => s.RepName, s => s.Color, s=>s.VisibleInLegend);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("funnel");
        }

        [Fact]
        public void Serializes_segmentSpacing()
        {
            series.SegmentSpacing = 80;
            GetJson(series)["segmentSpacing"].ShouldEqual(80.0);
        }

        [Fact]
        public void Should_not_serialize_default_padding()
        {
            GetJson(series).ContainsKey("segmentSpacing").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_NeckRatio()
        {
            series.NeckRatio = 2;
            GetJson(series)["neckRatio"].ShouldEqual(2.0);
        }

        [Fact]
        public void Should_not_serialize_default_neckRatio()
        {
            GetJson(series).ContainsKey("neckRatio").ShouldBeFalse();
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

        protected static IDictionary<string, object> GetJson(IChartFunnelSeries series)
        {
            return series.CreateSerializer().Serialize();
        }

        [Fact]
        public void Serializes_dynamicSlope()
        {
            series.DynamicSlope = true;
            GetJson(series)["dynamicSlope"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_dynamicSlope()
        {
            GetJson(series).ContainsKey("dynamicSlope").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_dynamicHeight()
        {
            series.DynamicHeight = false;
            GetJson(series)["dynamicHeight"].ShouldEqual(false);
        }

        [Fact]
        public void Should_not_serialize_default_dynamicHeight()
        {
            GetJson(series).ContainsKey("dynamicHeight").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_opacity()
        {
            series.Opacity = 0.55;
            GetJson(series)["opacity"].ShouldEqual(0.55);
        }

        [Fact]
        public void Should_not_serialize_default_opacity()
        {
            GetJson(series).ContainsKey("opacity").ShouldBeFalse();
        }
    }
}