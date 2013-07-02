namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartPolarScatterSeriesSerializerTests
    {
        protected ChartPolarScatterSeries<XYData, float, float> series;
        protected Chart<XYData> chart;

        public ChartPolarScatterSeriesSerializerTests()
        {
            chart = ChartTestHelper.CreateChart<XYData>();
            chart.Data = XYDataBuilder.GetCollection();
            series = new ChartPolarScatterSeries<XYData, float, float>(s => s.X, s => s.Y, s => s.NoteText);
        }

        [Fact]
        public void Serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("polarScatter");
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
