namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugeCapTests
    {
        private readonly RadialGaugeCap cap;
        private readonly RadialGaugeCapBuilder builder;

        public RadialGaugeCapTests()
        {
            cap = new RadialGaugeCap();
            builder = new RadialGaugeCapBuilder(cap);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            cap.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Opacity_sets_Opacity()
        {
            builder.Opacity(0.5);
            cap.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Size_sets_Size()
        {
            builder.Size(0.5);
            cap.Size.ShouldEqual(0.5);
        }
    }
}