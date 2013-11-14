namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartFunnelSeriesBuilderTests
    {
        private readonly ChartFunnelSeries<SalesData, decimal> series;
        private readonly ChartFunnelSeriesBuilder<SalesData> builder;

        public ChartFunnelSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartFunnelSeries<SalesData, decimal>(s => s.RepSales, null, null, null);
            builder = new ChartFunnelSeriesBuilder<SalesData>(series);
        }

        [Fact]
        public void Name_should_set_name()
        {
            builder.Name("Series");
            series.Name.ShouldEqual("Series");
        }

        [Fact]
        public void DynamicHeight_should_set_dynamicHeight()
        {
            builder.DynamicHeight(true);
            series.DynamicHeight.ShouldBeTrue();
        }

        [Fact]
        public void Dynamicheight_should_return_builder()
        {
            builder.DynamicHeight(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DynamicSlope_should_set_dynamicSlope()
        {
            builder.DynamicSlope(true);
            series.DynamicSlope.ShouldBeTrue();
        }

        [Fact]
        public void DynamicSlope_should_return_builder()
        {
            builder.DynamicSlope(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Ratio_should_set_ratio()
        {
            builder.NeckRatio(9.99);
            series.NeckRatio.ShouldEqual(9.99);
        }

        [Fact]
        public void Ratio_should_return_builder()
        {
            builder.NeckRatio(5.55).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(9.99);
            series.Opacity.ShouldEqual(9.99);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(0.55).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SegmentSpacing_should_set_segmentSpacing()
        {
            builder.SegmentSpacing(80);
            series.SegmentSpacing.ShouldEqual(80);
        }

        [Fact]
        public void SegmentSpacing_should_return_builder()
        {
            builder.SegmentSpacing(40).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Labels_should_set_labels_visibility()
        {
            builder.Labels(true);
            series.Labels.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Labels_should_return_builder()
        {
            builder.Labels(labels => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            series.Border.Color.ShouldEqual("red");
            series.Border.Width.ShouldEqual(1);
            series.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }
    }
}