namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartLineBuilderTests
    {
        private ChartLine line;
        private ChartLineBuilder builder;

        public ChartLineBuilderTests()
        {
            line = new ChartLine();
            builder = new ChartLineBuilder(line);
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
