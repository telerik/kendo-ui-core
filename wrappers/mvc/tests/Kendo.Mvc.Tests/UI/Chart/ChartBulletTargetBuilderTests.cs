namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartBulletTargetBuilderTests
    {
        private readonly ChartBulletTarget target;
        private readonly ChartBulletTargetBuilder builder;

        public ChartBulletTargetBuilderTests()
        {
            target = new ChartBulletTarget();
            builder = new ChartBulletTargetBuilder(target);
        }

        [Fact]
        public void Width_sets_width()
        {
            builder.Width(10);
            target.Width.ShouldEqual(10);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Blue");
            target.Color.ShouldEqual("Blue");
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            target.Border.Color.ShouldEqual("red");
            target.Border.Width.ShouldEqual(1);
            target.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            target.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}