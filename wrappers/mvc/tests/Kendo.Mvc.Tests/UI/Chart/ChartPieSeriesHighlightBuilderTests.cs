namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPieSeriesHighlightBuilderTests
    {
        protected ChartSeriesHighlight highlight;
        protected ChartPieSeriesHighlightBuilder builder;

        public ChartPieSeriesHighlightBuilderTests()
        {
            highlight = new ChartSeriesHighlight();
            builder = new ChartPieSeriesHighlightBuilder(highlight);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("red");
            highlight.Color.ShouldEqual("red");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("red").ShouldBeSameAs(builder);
        }
    }
}
