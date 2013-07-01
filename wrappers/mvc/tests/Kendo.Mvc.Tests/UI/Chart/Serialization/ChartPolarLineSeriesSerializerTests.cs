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
            series = new ChartPolarLineSeries<XYData, float, float>(s => s.X, s => s.Y, s => s.X.ToString());
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("polarLine");
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
