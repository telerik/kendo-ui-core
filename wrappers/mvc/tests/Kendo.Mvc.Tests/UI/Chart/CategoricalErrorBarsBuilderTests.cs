namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class CategoricalErrorBarsBuilderTests
    {
        private readonly CategoricalErrorBars errorBars;
        private readonly CategoricalErrorBarsBuilder builder;

        public CategoricalErrorBarsBuilderTests()
        {
            errorBars = new CategoricalErrorBars();
            builder = new CategoricalErrorBarsBuilder(errorBars);
        }

        [Fact]
        public void Color_returns_Builder()
        {
            builder.Color("Red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_sets_Color()
        {
            builder.Color("Red");
            errorBars.Color.ShouldEqual("Red");
        }

        [Fact]
        public void EndCaps_returns_Builder()
        {
            builder.EndCaps(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void EndCaps_sets_EndCaps()
        {
            builder.EndCaps(false);
            errorBars.EndCaps.ShouldEqual(false);
        }

        [Fact]
        public void Line_returns_Builder()
        {
            builder.Line(3, "Red", ChartDashType.LongDashDotDot).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_sets_Width_Color_And_DashType()
        {
            builder.Line(3, "Red", ChartDashType.LongDashDotDot);
            errorBars.Line.Width.ShouldEqual(3);
            errorBars.Line.Color.ShouldEqual("Red");
            errorBars.Line.DashType.ShouldEqual(ChartDashType.LongDashDotDot);
        }

        [Fact]
        public void LineBuilder_returns_Builder()
        {
            builder.Line(l => l.Color("Red")).ShouldBeSameAs(builder);            
        }

        [Fact]
        public void LineBuilder_configures_Line()
        {
            builder.Line(l => l.Color("Red").DashType(ChartDashType.LongDashDotDot).Width(3));
            errorBars.Line.Width.ShouldEqual(3);
            errorBars.Line.Color.ShouldEqual("Red");
            errorBars.Line.DashType.ShouldEqual(ChartDashType.LongDashDotDot);
        }

        [Fact]
        public void String_Value_returns_Builder()
        {
            builder.Value("stderr").ShouldBeSameAs(builder);            
        }

        [Fact]
        public void Value_sets_String_Value()
        {
            builder.Value("stderr");
            errorBars.Value.ShouldEqual("stderr");
        }

        [Fact]
        public void Double_Value_returns_Builder()
        {
            builder.Value(3.1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Value_sets_Double_Value()
        {
            builder.Value(3.1);
            errorBars.Value.ShouldEqual(3.1);
        }

        [Fact]
        public void Low_High_Value_returns_Builder()
        {
            builder.Value(1, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Value_sets_Low_And_High_Value_To_Array()
        {
            builder.Value(1, 3);
            errorBars.Value.ShouldBeType(typeof(double[]));
            var array = (double[])errorBars.Value;
            array[0].ShouldEqual(1);
            array[1].ShouldEqual(3);
        }

        [Fact]
        public void Content_Value_returns_Builder()
        {
            builder.Value((o) => null).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_Value_Sets_Handler_Descriptor()
        {            
            builder.Value((o) => null);
            errorBars.Value.ShouldBeType(typeof(ClientHandlerDescriptor));
        }
    }
}
