namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ScatterErrorBarsBuilderTests
    {
        private readonly ScatterErrorBars errorBars;
        private readonly ScatterErrorBarsBuilder builder;

        public ScatterErrorBarsBuilderTests()
        {
            errorBars = new ScatterErrorBars();
            builder = new ScatterErrorBarsBuilder(errorBars);
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
        public void String_XValue_returns_Builder()
        {
            builder.XValue("stderr").ShouldBeSameAs(builder);
        }

        [Fact]
        public void XValue_sets_String_Value()
        {
            builder.XValue("stderr");
            errorBars.XValue.ShouldEqual("stderr");
        }

        [Fact]
        public void String_YValue_returns_Builder()
        {
            builder.YValue("stderr").ShouldBeSameAs(builder);
        }

        [Fact]
        public void YValue_sets_String_Value()
        {
            builder.YValue("stderr");
            errorBars.YValue.ShouldEqual("stderr");
        }

        [Fact]
        public void Double_XValue_returns_Builder()
        {
            builder.XValue(3.1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void XValue_sets_Double_Value()
        {
            builder.XValue(3.1);
            errorBars.XValue.ShouldEqual(3.1);
        }

        [Fact]
        public void Double_YValue_returns_Builder()
        {
            builder.YValue(3.1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void YValue_sets_Double_Value()
        {
            builder.YValue(3.1);
            errorBars.YValue.ShouldEqual(3.1);
        }

        [Fact]
        public void Low_High_XValue_returns_Builder()
        {
            builder.XValue(1, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void XValue_sets_Low_And_High_Value_To_Array()
        {
            builder.XValue(1, 3);
            errorBars.XValue.ShouldBeType(typeof(double[]));
            var array = (double[])errorBars.XValue;
            array[0].ShouldEqual(1);
            array[1].ShouldEqual(3);
        }

        [Fact]
        public void Low_High_YValue_returns_Builder()
        {
            builder.YValue(1, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void YValue_sets_Low_And_High_Value_To_Array()
        {
            builder.YValue(1, 3);
            errorBars.YValue.ShouldBeType(typeof(double[]));
            var array = (double[])errorBars.YValue;
            array[0].ShouldEqual(1);
            array[1].ShouldEqual(3);
        }

        [Fact]
        public void Content_XValue_returns_Builder()
        {
            builder.XValue((o) => null).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_XValue_Sets_Handler_Descriptor()
        {
            builder.XValue((o) => null);
            errorBars.XValue.ShouldBeType(typeof(ClientHandlerDescriptor));
        }

        [Fact]
        public void Content_YValue_returns_Builder()
        {
            builder.YValue((o) => null).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_YValue_Sets_Handler_Descriptor()
        {
            builder.YValue((o) => null);
            errorBars.YValue.ShouldBeType(typeof(ClientHandlerDescriptor));
        }

        [Fact]
        public void XLowField_returns_Builder()
        {
            builder.XLowField("low").ShouldBeSameAs(builder);
        }

        [Fact]
        public void XLowField_sets_x_low_member()
        {
            builder.XLowField("low");
            errorBars.XLowMember.ShouldEqual("low");
        }

        [Fact]
        public void XHighField_returns_Builder()
        {
            builder.XHighField("high").ShouldBeSameAs(builder);
        }

        [Fact]
        public void XHighField_sets_x_high_member()
        {
            builder.XHighField("high");
            errorBars.XHighMember.ShouldEqual("high");
        }

        [Fact]
        public void XFields_returns_Builder()
        {
            builder.XFields("low", "high").ShouldBeSameAs(builder);
        }

        [Fact]
        public void XFields_sets_x_low_and_high_member()
        {
            builder.XFields("low", "high");
            errorBars.XLowMember.ShouldEqual("low");
            errorBars.XHighMember.ShouldEqual("high");
        }


        [Fact]
        public void YLowField_returns_Builder()
        {
            builder.YLowField("low").ShouldBeSameAs(builder);
        }

        [Fact]
        public void YLowField_sets_y_low_member()
        {
            builder.YLowField("low");
            errorBars.YLowMember.ShouldEqual("low");
        }

        [Fact]
        public void YHighField_returns_Builder()
        {
            builder.YHighField("high").ShouldBeSameAs(builder);
        }

        [Fact]
        public void YHighField_sets_y_high_member()
        {
            builder.YHighField("high");
            errorBars.YHighMember.ShouldEqual("high");
        }

        [Fact]
        public void YFields_returns_Builder()
        {
            builder.YFields("low", "high").ShouldBeSameAs(builder);
        }

        [Fact]
        public void YFields_sets_y_low_and_high_member()
        {
            builder.YFields("low", "high");
            errorBars.YLowMember.ShouldEqual("low");
            errorBars.YHighMember.ShouldEqual("high");
        }
    }
}
