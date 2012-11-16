namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartBubbleSeriesBuilderTests
    {
        protected IChartBubbleSeries series;
        protected ChartBubbleSeriesBuilder<BubbleData> builder;

        public ChartBubbleSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<BubbleData>();
            series = new ChartBubbleSeries<BubbleData, float, float, float>(s => s.X, s => s.Y, s => s.Size, null, null, null);
            builder = new ChartBubbleSeriesBuilder<BubbleData>(series);
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
        public void NegativeValues_should_return_builder()
        {
            builder.NegativeValues(nv => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_should_set_border_width()
        {
            builder.Border(2, "#ff0000");
            series.Border.Width.ShouldEqual(2);
        }

        [Fact]
        public void Border_should_set_border_color()
        {
            builder.Border(2, "#ff0000");
            series.Border.Color.ShouldEqual("#ff0000");
        }

        [Fact]
        public void Border_should_return_builder()
        {
            builder.Border(2, "#ff0000").ShouldBeSameAs(builder);
        }
    }
}
