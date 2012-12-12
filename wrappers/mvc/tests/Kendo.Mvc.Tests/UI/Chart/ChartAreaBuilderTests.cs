namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAreaBuilderTests
    {
        private readonly ChartAreaBuilder builder;
        private readonly ChartArea chartArea;

        public ChartAreaBuilderTests()
        {
            chartArea = new ChartArea();
            builder = new ChartAreaBuilder(chartArea);
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Red");
            chartArea.Background.ShouldEqual("Red");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            chartArea.Margin.Top.ShouldEqual(20);
            chartArea.Margin.Right.ShouldEqual(20);
            chartArea.Margin.Bottom.ShouldEqual(20);
            chartArea.Margin.Left.ShouldEqual(20);

            builder.Margin(0, 1, 2, 3);
            chartArea.Margin.Top.ShouldEqual(0);
            chartArea.Margin.Right.ShouldEqual(1);
            chartArea.Margin.Bottom.ShouldEqual(2);
            chartArea.Margin.Left.ShouldEqual(3);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            chartArea.Border.Color.ShouldEqual("red");
            chartArea.Border.Width.ShouldEqual(1);
            chartArea.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            chartArea.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}