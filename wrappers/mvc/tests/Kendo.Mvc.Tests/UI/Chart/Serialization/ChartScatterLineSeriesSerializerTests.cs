namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartScatterLineSeriesSerializerTests
    {
        protected ChartScatterLineSeries<XYData, float, float> series;
        protected Chart<XYData> chart;

        public ChartScatterLineSeriesSerializerTests()
        {
            chart = ChartTestHelper.CreateChart<XYData>();
            chart.Data = XYDataBuilder.GetCollection();
            series = new ChartScatterLineSeries<XYData, float, float>(s => s.X, s => s.Y, s => s.NoteText);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("scatterLine");
        }

        [Fact]
        public void Serializes_width()
        {
            series.Width = 2;
            GetJson(series)["width"].ShouldEqual(2.0);
        }

        [Fact]
        public void Should_not_seriale_default_width()
        {
            GetJson(series).ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_DashType()
        {
            series.DashType = ChartDashType.Dash;
            GetJson(series)["dashType"].ShouldEqual("dash");
        }

        [Fact]
        public void Should_not_seriale_default_DashType()
        {
            GetJson(series).ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_MissingValues()
        {
            series.MissingValues = ChartScatterLineMissingValues.Interpolate;
            GetJson(series)["missingValues"].ShouldEqual("interpolate");
        }

        [Fact]
        public void Should_not_serialize_default_MissingValues()
        {
            GetJson(series).ContainsKey("missingValues").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Style()
        {
            series.Style = ChartScatterLineStyle.Smooth;
            GetJson(series)["style"].ShouldEqual("smooth");
        }

        [Fact]
        public void Should_not_serialize_default_Style()
        {
            GetJson(series).ContainsKey("style").ShouldBeFalse();
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
        public void Should_serialize_data_if_set()
        {
            series.Data = new XYData[] { new XYData() };
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
        public void Should_serialize_marker_settings()
        {
            series.Markers.Background = "green";
            GetJson(series).ContainsKey("markers").ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_marker_settings_by_default()
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
        public void Serializes_ErrorBars()
        {
            series.ErrorBars = new ScatterErrorBars();
            series.ErrorBars.XValue = 1;
            GetJson(series).ContainsKey("errorBars").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_ErrorBars()
        {
            GetJson(series).ContainsKey("errorBars").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_x_error_low_and_high_name()
        {
            series.XErrorLowMember = "low";
            series.XErrorHighMember = "high";
            GetJson(series).ContainsKey("xErrorLowField").ShouldBeTrue();
            GetJson(series).ContainsKey("xErrorHighField").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_only_x_error_low_name()
        {
            series.XErrorLowMember = "low";
            GetJson(series).ContainsKey("xErrorLowField").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_only_x_error_high_name()
        {
            series.XErrorHighMember = "high";
            GetJson(series).ContainsKey("xErrorHighField").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_default_x_error_low_and_high_name()
        {
            GetJson(series).ContainsKey("xErrorLowField").ShouldBeFalse();
            GetJson(series).ContainsKey("xErrorHighField").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_y_error_low_and_high_name()
        {
            series.YErrorLowMember = "low";
            series.YErrorHighMember = "high";
            GetJson(series).ContainsKey("yErrorLowField").ShouldBeTrue();
            GetJson(series).ContainsKey("yErrorHighField").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_only_y_error_low_name()
        {
            series.YErrorLowMember = "low";
            GetJson(series).ContainsKey("yErrorLowField").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_only_y_error_high_name()
        {
            series.YErrorHighMember = "high";
            GetJson(series).ContainsKey("yErrorHighField").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_default_y_error_low_and_high_name()
        {
            GetJson(series).ContainsKey("yErrorLowField").ShouldBeFalse();
            GetJson(series).ContainsKey("yErrorHighField").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
