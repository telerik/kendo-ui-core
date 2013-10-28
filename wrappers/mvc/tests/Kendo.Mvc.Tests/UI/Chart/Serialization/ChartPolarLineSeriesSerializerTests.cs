namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartPolarLineSeriesSerializerTests
    {
        protected ChartPolarLineSeries<XYData, float, float> series;
        protected Chart<XYData> chart;

        public ChartPolarLineSeriesSerializerTests()
        {
            chart = ChartTestHelper.CreateChart<XYData>();
            chart.Data = XYDataBuilder.GetCollection();
            series = new ChartPolarLineSeries<XYData, float, float>(s => s.X, s => s.Y, s => s.NoteText);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("polarLine");
        }

        [Fact]
        public void Serializes_Style()
        {
            series.Style = ChartPolarLineStyle.Smooth;
            GetJson(series)["style"].ShouldEqual("smooth");
        }

        [Fact]
        public void Should_not_serialize_default_Style()
        {
            GetJson(series).ContainsKey("style").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
