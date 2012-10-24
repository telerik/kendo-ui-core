namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartScatterSeriesBuilderTests
        : ChartSeriesBuilderBaseTests<IChartScatterSeries, ChartScatterSeriesBuilder<XYData>>
    {
        public ChartScatterSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<XYData>();
            series = new ChartScatterSeries<XYData, float, float>(s => s.X, s => s.Y);
            builder = new ChartScatterSeriesBuilder<XYData>(series);
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
        public void Markers_should_set_markers_visibility()
        {
            builder.Markers(true);
            series.Markers.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Markers_should_return_builder()
        {
            builder.Markers(labels => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void XAxis_should_set_XAxis_name()
        {
            builder.XAxis("Secondary");
            series.XAxis.ShouldEqual("Secondary");
        }

        [Fact]
        public void XAxis_should_return_builder()
        {
            builder.XAxis("Secondary").ShouldBeSameAs(builder);
        }

        [Fact]
        public void YAxis_should_set_YAxis_name()
        {
            builder.YAxis("Secondary");
            series.YAxis.ShouldEqual("Secondary");
        }

        [Fact]
        public void YAxis_should_return_builder()
        {
            builder.YAxis("Secondary").ShouldBeSameAs(builder);
        }
    }
}