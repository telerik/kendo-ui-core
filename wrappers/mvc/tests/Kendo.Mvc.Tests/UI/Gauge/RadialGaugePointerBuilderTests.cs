namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugePointerBuilderTests
    {
        private readonly GaugeRadialPointer<double> pointer;
        private readonly GaugeRadialPointerBuilder<double> builder;

        public RadialGaugePointerBuilderTests()
        {
            pointer = new GaugeRadialPointer<double>();
            builder = new GaugeRadialPointerBuilder<double>(pointer);
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