namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartCandlestickSeriesHighlightBuilderTests
    {
        protected ChartSeriesHighlight highlight;
        protected ChartCandlestickSeriesHighlightBuilder builder;

        public ChartCandlestickSeriesHighlightBuilderTests()
        {
            highlight = new ChartSeriesHighlight();
            builder = new ChartCandlestickSeriesHighlightBuilder(highlight);
        }

        [Fact]
        public void Line_should_set_line_width()
        {
            builder.Line(1);
            highlight.Line.Width.ShouldEqual(1);
        }

        [Fact]
        public void Line_should_return_builder()
        {
            builder.Line(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_color_should_set_line_width_and_color()
        {
            builder.Line(1, "red");
            highlight.Line.Color.ShouldEqual("red");
            highlight.Line.Width.ShouldEqual(1);
        }

        [Fact]
        public void Line_color_should_return_builder()
        {
            builder.Line(1, "red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_builder_should_configure_line()
        {
            builder.Line(l => l.Color("red")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_builder_should_return_builder()
        {
            builder.Line(l => l.Color("red")).ShouldBeSameAs(builder);
        }
    }
}
