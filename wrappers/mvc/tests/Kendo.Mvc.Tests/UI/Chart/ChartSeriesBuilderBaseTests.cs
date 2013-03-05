namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public abstract class ChartSeriesBuilderBaseTests<TSeries, TSeriesBuilder>
        where TSeries : IChartSeries
        where TSeriesBuilder : ChartSeriesBuilderBase<TSeries, TSeriesBuilder>
    {
        protected TSeries series;
        protected TSeriesBuilder builder;

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