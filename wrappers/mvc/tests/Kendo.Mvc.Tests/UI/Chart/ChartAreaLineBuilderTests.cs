namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAreaLineBuilderTests
    {
        private ChartAreaLine line;
        private ChartAreaLineBuilder builder;

        public ChartAreaLineBuilderTests()
        {
            line = new ChartAreaLine();
            builder = new ChartAreaLineBuilder(line);
        }

        [Fact]
        public void Style_should_set_style()
        {
            builder.Style(ChartAreaStyle.Smooth);
            line.Style.ShouldEqual(ChartAreaStyle.Smooth);
        }

        [Fact]
        public void Style_should_return_builder()
        {
            builder.Style(ChartAreaStyle.Smooth).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("Red");
            line.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("Red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Width_should_set_width()
        {
            builder.Width(2);
            line.Width.ShouldEqual(2);
        }

        [Fact]
        public void Width_should_return_builder()
        {
            builder.Width(2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DashType_should_set_dashType()
        {
            builder.DashType(ChartDashType.LongDashDotDot);
            line.DashType.ShouldEqual(ChartDashType.LongDashDotDot);
        }

        [Fact]
        public void DashType_should_return_builder()
        {
            builder.DashType(ChartDashType.LongDashDotDot).ShouldBeSameAs(builder);
        }

    }
}
