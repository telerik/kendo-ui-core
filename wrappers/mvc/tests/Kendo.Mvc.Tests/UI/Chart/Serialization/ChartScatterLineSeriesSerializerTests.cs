namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class ChartScatterLineSeriesSerializerTests
        : ChartScatterSeriesSerializerTests
    {
        private ChartScatterLineSeries<XYData, float, float> scatterLineSeries
        {
            get
            {
                return (ChartScatterLineSeries<XYData, float, float>)series;
            }
        }

        public ChartScatterLineSeriesSerializerTests()
        {
            series = new ChartScatterLineSeries<XYData, float, float>(s => s.X, s => s.Y);
        }

        [Fact]
        public override void Serializes_type()
        {
            GetJson(scatterLineSeries)["type"].ShouldEqual("scatterLine");
        }

        [Fact]
        public void Serializes_width()
        {
            scatterLineSeries.Width = 2;
            GetJson(scatterLineSeries)["width"].ShouldEqual(2.0);
        }

        [Fact]
        public void Should_not_seriale_default_width()
        {
            GetJson(scatterLineSeries).ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_DashType()
        {
            scatterLineSeries.DashType = ChartDashType.Dash;
            GetJson(scatterLineSeries)["dashType"].ShouldEqual("dash");
        }

        [Fact]
        public void Should_not_seriale_default_DashType()
        {
            GetJson(scatterLineSeries).ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_MissingValues()
        {
            scatterLineSeries.MissingValues = ChartScatterLineMissingValues.Interpolate;
            GetJson(scatterLineSeries)["missingValues"].ShouldEqual("interpolate");
        }

        [Fact]
        public void Should_not_seriale_default_MissingValues()
        {
            GetJson(scatterLineSeries).ContainsKey("missingValues").ShouldBeFalse();
        }
    }
}
