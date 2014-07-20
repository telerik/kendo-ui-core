namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartLineSeriesHighlightBuilderTests
    {
        protected ChartSeriesHighlight highlight;
        protected ChartLineSeriesHighlightBuilder builder;

        public ChartLineSeriesHighlightBuilderTests()
        {
            highlight = new ChartSeriesHighlight();
            builder = new ChartLineSeriesHighlightBuilder(highlight);
        }

        [Fact]
        public void Visible_should_set_visibility()
        {
            builder.Visible(false);
            highlight.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Visible_should_return_builder()
        {
            builder.Visible(true).ShouldBeSameAs(builder);
        }
    }
}
