namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugePointerTests
    {
        private readonly RadialGaugePointer pointer;
        private readonly RadialGaugePointerBuilder builder;

        public RadialGaugePointerTests()
        {
            pointer = new RadialGaugePointer();
            builder = new RadialGaugePointerBuilder(pointer);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            pointer.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Opacity_sets_Opacity()
        {
            builder.Opacity(0.5);
            pointer.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Value_sets_Value()
        {
            builder.Value(0.5);
            pointer.Value.ShouldEqual(0.5);
        }

        [Fact]
        public void Cap_sets_Cap()
        {
            builder.Cap(c => c.Color("red"));
            pointer.Cap.Color.ShouldEqual("red");
        }
    }
}