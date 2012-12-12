namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartBubbleSeriesSerializerTests
    {
        protected Chart<BubbleData> chart;
        protected ChartBubbleSeries<BubbleData, float, float, float> series;

        public ChartBubbleSeriesSerializerTests()
        {
            chart = ChartTestHelper.CreateChart<BubbleData>();
            chart.Data = BubbleDataBuilder.GetCollection();
            series = new ChartBubbleSeries<BubbleData, float, float, float>(s => s.X, s => s.Y, s => s.Size, null, null, null);
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

        [Fact]
        public void Should_serialize_highlight()
        {
            series.Highlight.Color = "red";
            GetJson(series).ContainsKey("highlight").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_highlight()
        {
            GetJson(series).ContainsKey("highlight").ShouldBeFalse();
        }

        [Fact]
        public virtual void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("bubble");
        }

        [Fact]
        public void Should_serialize_data_if_set()
        {
            series.Data = new BubbleData[] { new BubbleData() };
            (GetJson(series)["data"] is IEnumerable).ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_data_if_not_set()
        {
            series.Data = null;
            GetJson(series).ContainsKey("data").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_xField_if_XMember_is_set()
        {
            series.XMember = "X";
            GetJson(series)["xField"].ShouldEqual("X");
        }

        [Fact]
        public void Should_not_serialize_xField_if_XMember_is_not_set()
        {
            series.XMember = null;
            GetJson(series).ContainsKey("xField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_yField_if_YMember_is_set()
        {
            series.YMember = "Y";
            GetJson(series)["yField"].ShouldEqual("Y");
        }

        [Fact]
        public void Should_not_serialize_yField_if_YMember_is_not_set()
        {
            series.YMember = null;
            GetJson(series).ContainsKey("yField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_sizeField_if_SizeMember_is_set()
        {
            series.SizeMember = "Size";
            GetJson(series)["sizeField"].ShouldEqual("Size");
        }

        [Fact]
        public void Should_not_serialize_sizeField_if_SizeMember_is_not_set()
        {
            series.SizeMember = null;
            GetJson(series).ContainsKey("sizeField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_colorField_if_ColorMember_is_set()
        {
            series.ColorMember = "Color";
            GetJson(series)["colorField"].ShouldEqual("Color");
        }

        [Fact]
        public void Should_not_serialize_colorField_if_ColorMember_is_not_set()
        {
            series.ColorMember = null;
            GetJson(series).ContainsKey("colorField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_categoryField_if_CategoryMember_is_set()
        {
            series.CategoryMember = "Category";
            GetJson(series)["categoryField"].ShouldEqual("Category");
        }

        [Fact]
        public void Should_not_serialize_categoryField_if_CategoryMember_is_not_set()
        {
            series.CategoryMember = null;
            GetJson(series).ContainsKey("categoryField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_visibleInLegendField_if_VisibleInLegendMember_is_set()
        {
            series.VisibleInLegendMember = "VisibleInLegend";
            GetJson(series)["visibleInLegendField"].ShouldEqual("VisibleInLegend");
        }

        [Fact]
        public void Should_not_serialize_visibleInLegendField_if_VisibleInLegendMember_is_not_set()
        {
            series.VisibleInLegendMember = null;
            GetJson(series).ContainsKey("visibleInLegendField").ShouldBeFalse();
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
        public void Should_not_serialize_marker_settings()
        {
            GetJson(series).ContainsKey("markers").ShouldEqual(false);
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
        public void Serializes_XAxis()
        {
            series.XAxis = "Axis";
            GetJson(series)["xAxis"].ShouldEqual("Axis");
        }

        [Fact]
        public void Should_not_serialize_empty_xAxis()
        {
            series.XAxis = string.Empty;
            GetJson(series).ContainsKey("xAxis").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_YAxis()
        {
            series.YAxis = "Axis";
            GetJson(series)["yAxis"].ShouldEqual("Axis");
        }

        [Fact]
        public void Should_not_serialize_empty_yAxis()
        {
            series.YAxis = string.Empty;
            GetJson(series).ContainsKey("yAxis").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_minSize()
        {
            series.MinSize = 100;
            GetJson(series)["minSize"].ShouldEqual(100);
        }

        [Fact]
        public void Should_not_serialize_empty_minSize()
        {
            GetJson(series).ContainsKey("minSize").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_maxSize()
        {
            series.MaxSize = 100;
            GetJson(series)["maxSize"].ShouldEqual(100);
        }

        [Fact]
        public void Should_not_serialize_empty_maxSize()
        {
            GetJson(series).ContainsKey("maxSize").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_negativeValues_settings()
        {
            series.NegativeValues.Visible = true;
            GetJson(series).ContainsKey("negativeValues").ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_negativeValues_settings_by_default()
        {
            GetJson(series).ContainsKey("negativeValues").ShouldEqual(false);
        }

        [Fact]
        public void Should_serialize_border_settings()
        {
            series.Border.Width = 1;
            GetJson(series).ContainsKey("border").ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_border_settings_by_default()
        {
            GetJson(series).ContainsKey("border").ShouldEqual(false);
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
