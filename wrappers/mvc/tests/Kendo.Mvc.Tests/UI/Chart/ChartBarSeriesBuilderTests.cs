namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using Xunit;

    public class ChartBarSeriesBuilderTests
    {
        protected IChartBarSeries series;
        protected ChartBarSeriesBuilder<SalesData> builder;
        private readonly Func<object, object> nullFunc;

        public ChartBarSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartBarSeries<SalesData, decimal>(s => s.RepSales, null);
            builder = new ChartBarSeriesBuilder<SalesData>(series);
            nullFunc = (o) => null;
        }

        [Fact]
        public void Name_should_set_name()
        {
            builder.Name("Series");
            series.Name.ShouldEqual("Series");
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
        public void Color_with_Func_should_set_InlineCodeBlock()
        {
            builder.Color(nullFunc);
            series.ColorHandler.TemplateDelegate.ShouldBeSameAs(nullFunc);
        }

        [Fact]
        public void Color_with_Func_should_return_builder()
        {
            builder.Color(nullFunc).ShouldBeSameAs(builder);
        }

        [Fact]
        public void NegativeColor_should_set_negative_color()
        {
            builder.NegativeColor("Blue");
            series.NegativeColor.ShouldEqual("Blue");
        }

        [Fact]
        public void NegativeColor_should_return_builder()
        {
            builder.NegativeColor("Blue").ShouldBeSameAs(builder);
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
        public void Stack_should_set_Stacked()
        {
            builder.Stack(true);
            series.Stacked.ShouldBeTrue();
        }

        [Fact]
        public void Stack_should_return_builder()
        {
            builder.Stack(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Stack_should_set_StackName()
        {
            builder.Stack("Female");
            series.StackName.ShouldEqual("Female");
        }

        [Fact]
        public void Stack_name_should_return_builder()
        {
            builder.Stack("Female").ShouldBeSameAs(builder);
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
        public void Gap_should_set_gap()
        {
            builder.Gap(1);
            series.Gap.ShouldEqual(1);
        }

        [Fact]
        public void Spacing_should_set_spacing()
        {
            builder.Spacing(1);
            series.Spacing.ShouldEqual(1);
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

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            series.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Overlay_should_set_overlay()
        {
            builder.Overlay(ChartBarSeriesOverlay.None);
            series.Overlay.ShouldEqual(ChartBarSeriesOverlay.None);
        }

        [Fact]
        public void Overlay_should_return_builder()
        {
            builder.Overlay(ChartBarSeriesOverlay.None).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Highlight_should_configure_Highlight()
        {
            builder.Highlight(highlight => highlight.Visible(false));
            series.Highlight.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Highlight_should_return_builder()
        {
            builder.Highlight(highlight => highlight.Visible(false)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Highlight_should_set_visible()
        {
            builder.Highlight(false);
            series.Highlight.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Highlight_with_bool_should_return_builder()
        {
            builder.Highlight(false).ShouldBeSameAs(builder);
        }

    }
}
