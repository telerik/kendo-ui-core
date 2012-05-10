namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class LinearGaugePointerTests
    {
        private readonly LinearGaugePointer pointer;
        private readonly LinearGaugePointerBuilder builder;

        public LinearGaugePointerTests()
        {
            pointer = new LinearGaugePointer();
            builder = new LinearGaugePointerBuilder(pointer);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            pointer.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            pointer.Margin.Top.ShouldEqual(20);
            pointer.Margin.Right.ShouldEqual(20);
            pointer.Margin.Bottom.ShouldEqual(20);
            pointer.Margin.Left.ShouldEqual(20);

            builder.Margin(1, 2, 3, 4);
            pointer.Margin.Top.ShouldEqual(1);
            pointer.Margin.Right.ShouldEqual(2);
            pointer.Margin.Bottom.ShouldEqual(3);
            pointer.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            pointer.Border.Color.ShouldEqual("red");
            pointer.Border.Width.ShouldEqual(1);
            pointer.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Shape_sets_Shape()
        {
            builder.Shape(LinearGaugePointerShape.Arrow);
            pointer.Shape.ShouldEqual(LinearGaugePointerShape.Arrow);
        }

        [Fact]
        public void Size_sets_Size()
        {
            builder.Size(0.5);
            pointer.Size.ShouldEqual(0.5);
        }

        [Fact]
        public void Value_sets_Value()
        {
            builder.Value(0.5);
            pointer.Value.ShouldEqual(0.5);
        }
    }
}