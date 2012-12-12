namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeLinearTrackBuilderTests
    {
        private readonly GaugeLinearTrack shape;
        private readonly GaugeLinearTrackBuilder builder;

        public GaugeLinearTrackBuilderTests()
        {
            shape = new GaugeLinearTrack();
            builder = new GaugeLinearTrackBuilder(shape);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            shape.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            shape.Border.Color.ShouldEqual("red");
            shape.Border.Width.ShouldEqual(1);
            shape.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            shape.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Visible_sets_Visible()
        {
            builder.Visible(false);
            shape.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Size_sets_Size()
        {
            builder.Size(0.5);
            shape.Size.ShouldEqual(0.5);
        }
    }
}