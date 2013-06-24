namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartPolarAreaSeriesSerializerTests
    {
        protected ChartPolarAreaSeries<XYData, float, float> series;
        protected Chart<XYData> chart;

        public ChartPolarAreaSeriesSerializerTests()
        {
            chart = ChartTestHelper.CreateChart<XYData>();
            chart.Data = XYDataBuilder.GetCollection();
            series = new ChartPolarAreaSeries<XYData, float, float>(s => s.X, s => s.Y);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("polarArea");
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
