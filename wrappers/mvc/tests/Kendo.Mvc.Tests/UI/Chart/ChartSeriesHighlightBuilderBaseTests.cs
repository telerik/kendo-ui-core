namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartSeriesHighlightBuilderTests
    {
        protected ChartSeriesHighlight highlight;
        protected ChartBubbleSeriesHighlightBuilder builder;

        public ChartSeriesHighlightBuilderTests()
        {
            highlight = new ChartSeriesHighlight();
            builder = new ChartBubbleSeriesHighlightBuilder(highlight);
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.5);
            highlight.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(0.5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_should_set_border_width()
        {
            builder.Border(2);
            highlight.Border.Width.ShouldEqual(2);
        }

        [Fact]
        public void Border_should_return_builder()
        {
            builder.Border(2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_should_set_border_width_and_color()
        {
            builder.Border(2, "red");
            highlight.Border.Width.ShouldEqual(2);
            highlight.Border.Color.ShouldEqual("red");
        }

        [Fact]
        public void Border_with_color_should_return_builder()
        {
            builder.Border(2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            highlight.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}
