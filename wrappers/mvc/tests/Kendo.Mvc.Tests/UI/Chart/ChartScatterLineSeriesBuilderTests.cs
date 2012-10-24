namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartScatterLineSeriesBuilderTests
        : ChartSeriesBuilderBaseTests<IChartScatterLineSeries, ChartScatterLineSeriesBuilder<XYData>>
    {
        public ChartScatterLineSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<XYData>();
            series = new ChartScatterLineSeries<XYData, float, float>(s => s.X, s => s.Y);
            builder = new ChartScatterLineSeriesBuilder<XYData>(series);
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
        public void Width_should_set_width()
        {
            builder.Width(1);
            series.Width.ShouldEqual(1);
        }

        [Fact]
        public void DashType_should_set_dash_type()
        {
            builder.DashType(ChartDashType.Dash);
            series.DashType.ShouldEqual(ChartDashType.Dash);
        }

        [Fact]
        public void MissingValues_should_set_missingValues()
        {
            builder.MissingValues(ChartScatterLineMissingValues.Interpolate);
            series.MissingValues.ShouldEqual(ChartScatterLineMissingValues.Interpolate);
        }
    }
}