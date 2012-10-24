namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartBubbleSeriesBuilderTests
        : ChartSeriesBuilderBaseTests<IChartBubbleSeries, ChartBubbleSeriesBuilder<BubbleData>>
    {
        public ChartBubbleSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<BubbleData>();
            series = new ChartBubbleSeries<BubbleData, float, float, float>(s => s.X, s => s.Y, s => s.Size, null, null, null);
            builder = new ChartBubbleSeriesBuilder<BubbleData>(series);
        }

        [Fact]
        public void NegativeValues_should_return_builder()
        {
            builder.NegativeValues(nv => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_should_set_border_width()
        {
            builder.Border(2, "#ff0000");
            series.Border.Width.ShouldEqual(2);
        }

        [Fact]
        public void Border_should_set_border_color()
        {
            builder.Border(2, "#ff0000");
            series.Border.Color.ShouldEqual("#ff0000");
        }

        [Fact]
        public void Border_should_return_builder()
        {
            builder.Border(2, "#ff0000").ShouldBeSameAs(builder);
        }
    }
}