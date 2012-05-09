namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class LinearGaugeTrackTests
    {
        private readonly LinearGaugeTrack shape;
        private readonly LinearGaugeTrackBuilder builder;

        public LinearGaugeTrackTests()
        {
            shape = new LinearGaugeTrack();
            builder = new LinearGaugeTrackBuilder(shape);
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