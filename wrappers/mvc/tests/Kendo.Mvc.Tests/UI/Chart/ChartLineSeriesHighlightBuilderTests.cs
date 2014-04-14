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
        public void Markers_should_set_markers_visibility()
        {
            builder.Markers(true);
            highlight.Markers.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Markers_should_return_builder()
        {
            builder.Markers(labels => { }).ShouldBeSameAs(builder);
        }
    }
}
