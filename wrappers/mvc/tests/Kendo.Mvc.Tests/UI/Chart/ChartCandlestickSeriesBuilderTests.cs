namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartCandlestickSeriesBuilderTests
    {
        private IChartCandlestickSeries series;
        private ChartCandlestickSeriesBuilder<OHLCData> builder;

        public ChartCandlestickSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<OHLCData>();
            series = new ChartCandlestickSeries<OHLCData, decimal>(d => d.Open, d => d.High, d => d.Low, d => d.Close, d => d.Color, d => d.DownColor);
            builder = new ChartCandlestickSeriesBuilder<OHLCData>(series);
        }

        [Fact]
        public void Overlay_should_set_overlay()
        {
            builder.Overlay(ChartBarSeriesOverlay.None);
            series.Overlay.ShouldEqual(ChartBarSeriesOverlay.None);
        }

        [Fact]
        public void Overlay_should_return_builder()
        {
            builder.Overlay(ChartBarSeriesOverlay.None).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Highlight_with_builder_should_configure_highlight()
        {
            builder.Highlight(highlight => { highlight.Border(1); });
            series.Highlight.Border.Width.ShouldEqual(1);
        }

        [Fact]
        public void Highlight_with_builder_should_return_builder()
        {
            builder.Highlight(highlight => { }).ShouldBeSameAs(builder);
        }
    }
}