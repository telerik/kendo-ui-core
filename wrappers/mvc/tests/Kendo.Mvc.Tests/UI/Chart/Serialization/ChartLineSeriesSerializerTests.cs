namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartLineSeriesSerializerTests
        : ChartBoundSeriesSerializerTests<ChartLineSeries<SalesData, decimal>, SalesData, decimal>
    {
        public ChartLineSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            chart.Data = SalesDataBuilder.GetCollection();
            series = new ChartLineSeries<SalesData, decimal>(s => s.RepSales);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("line");
        }

        [Fact]
        public void Serializes_type_for_vertical_orientation()
        {
            series.Orientation = ChartSeriesOrientation.Vertical;
            GetJson(series)["type"].ShouldEqual("verticalLine");
        }

        [Fact]
        public void Serializes_stack()
        {
            series.Stacked = true;
            GetJson(series)["stack"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_seriale_default_stack()
        {
            GetJson(series).ContainsKey("stack").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_aggregate()
        {
            series.Aggregate = ChartSeriesAggregate.Max;
            GetJson(series)["aggregate"].ShouldEqual("max");
        }

        [Fact]
        public void Should_not_serialize_default_aggregate()
        {
            GetJson(series).ContainsKey("aggregate").ShouldBeFalse();
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
            series.MissingValues = ChartLineMissingValues.Interpolate;
            GetJson(series)["missingValues"].ShouldEqual("interpolate");
        }

        [Fact]
        public void Should_not_seriale_default_MissingValues()
        {
            GetJson(series).ContainsKey("missingValues").ShouldBeFalse();
        }
    }
}
