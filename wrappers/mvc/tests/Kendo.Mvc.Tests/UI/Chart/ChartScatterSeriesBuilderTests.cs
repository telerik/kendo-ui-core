namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartScatterSeriesBuilderTests
    {
        protected IChartScatterSeries series;
        protected ChartScatterSeriesBuilder<XYData> builder;

        public ChartScatterSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<XYData>();
            series = new ChartScatterSeries<XYData, float, float>(s => s.X, s => s.Y);
            builder = new ChartScatterSeriesBuilder<XYData>(series);
        }

        [Fact]
        public void Name_should_set_name()
        {
            builder.Name("Series");
            series.Name.ShouldEqual("Series");
        }

        [Fact]
        public void GroupNameTemplate_should_set_name()
        {
            builder.GroupNameTemplate("#= series.name #");
            series.GroupNameTemplate.ShouldEqual("#= series.name #");
        }

        [Fact]
        public void GroupNameTemplate_should_return_builder()
        {
            builder.GroupNameTemplate("#= series.name #").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.5);
            series.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(0.5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("Blue");
            series.Color.ShouldEqual("Blue");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("Blue").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Tooltip_should_set_visibility()
        {
            builder.Tooltip(true);
            series.Tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Tooltip_should_return_builder()
        {
            builder.Tooltip(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Tooltip_with_builder_should_configure_tooltip()
        {
            builder.Tooltip(tooltip => { tooltip.Visible(true); });
            series.Tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Tooltip_with_builder_should_return_builder()
        {
            builder.Tooltip(legend => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Axis_should_set_axisName()
        {
            builder.Axis("Secondary");
            series.Axis.ShouldEqual("Secondary");
        }

        [Fact]
        public void Axis_should_return_builder()
        {
            builder.Axis("Secondary").ShouldBeSameAs(builder);
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
