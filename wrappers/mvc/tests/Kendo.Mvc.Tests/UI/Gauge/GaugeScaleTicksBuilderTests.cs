namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeScaleTicksBuilderTests
    {
        private readonly GaugeScaleTicks ticks;
        private readonly GaugeScaleTicksBuilder builder;

        public GaugeScaleTicksBuilderTests()
        {
            ticks = new GaugeScaleTicks();
            builder = new GaugeScaleTicksBuilder(ticks);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("color");
            ticks.Color.ShouldEqual("color");
        }

        [Fact]
        public void Width_should_set_width()
        {
            builder.Width(2);
            ticks.Width.ShouldEqual(2);
        }

        [Fact]
        public void Size_should_set_size()
        {
            builder.Size(2);
            ticks.Size.ShouldEqual(2);
        }

        [Fact]
        public void Visible_should_set_visible()
        {
            builder.Visible(false);
            ticks.Visible.ShouldEqual(false);
        }

        [Fact]
        public void DashType_should_set_dashType()
        {
            builder.DashType(ChartDashType.Dot);
            ticks.DashType.ToString().ToLowerInvariant().ShouldEqual("dot");
        }
    }
}