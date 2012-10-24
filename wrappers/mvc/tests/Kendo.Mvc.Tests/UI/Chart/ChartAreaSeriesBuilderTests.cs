namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAreaSeriesBuilderTests
        : ChartSeriesBuilderBaseTests<IChartAreaSeries, ChartAreaSeriesBuilder<SalesData>>
    {
        public ChartAreaSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartAreaSeries<SalesData, decimal>(s => s.RepSales);
            builder = new ChartAreaSeriesBuilder<SalesData>(series);
        }

        [Fact]
        public void Stack_should_set_Stacked()
        {
            builder.Stack(true);
            series.Stacked.ShouldBeTrue();
        }

        [Fact]
        public void Aggregate_should_set_Aggregate()
        {
            builder.Aggregate(ChartSeriesAggregate.Max);
            series.Aggregate.ShouldEqual(ChartSeriesAggregate.Max);
        }

        [Fact]
        public void Aggregate_should_return_builder()
        {
            builder.Aggregate(ChartSeriesAggregate.Max).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_should_set_line_color()
        {
            builder.Line(l => l.Color("lineColor"));
            series.Line.Color.ShouldEqual("lineColor");
        }

        [Fact]
        public void Line_should_set_line_opacity()
        {
            builder.Line(l => l.Opacity(0.33));
            series.Line.Opacity.ShouldEqual(0.33);
        }

        [Fact]
        public void Line_should_set_dash_width()
        {
            builder.Line(l => l.Width(9));
            series.Line.Width.ShouldEqual(9);
        }

        [Fact]
        public void Line_should_set_dash_type()
        {
            builder.Line(l => l.DashType(ChartDashType.Dash));
            series.Line.DashType.ShouldEqual(ChartDashType.Dash);
        }

        [Fact]
        public void Line_should_set_line_configuration()
        {
            builder.Line(2, "lineColor", ChartDashType.Dash);
            series.Line.Color.ShouldEqual("lineColor");
            series.Line.Width.ShouldEqual(2);
            series.Line.DashType.ShouldEqual(ChartDashType.Dash);
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
        public void MissingValues_should_set_missingValues()
        {
            builder.MissingValues(ChartAreaMissingValues.Interpolate);
            series.MissingValues.ShouldEqual(ChartAreaMissingValues.Interpolate);
        }
    }
}