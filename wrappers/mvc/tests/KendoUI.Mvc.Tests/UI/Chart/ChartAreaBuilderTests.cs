namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ChartAreaBuilderTests
    {
        private readonly ChartAreaBuilder builder;
        private readonly ChartArea charArea;

        public ChartAreaBuilderTests()
        {
            charArea = new ChartArea();
            builder = new ChartAreaBuilder(charArea);
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Red");
            charArea.Background.ShouldEqual("Red");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            charArea.Margin.Top.ShouldEqual(20);
            charArea.Margin.Right.ShouldEqual(20);
            charArea.Margin.Bottom.ShouldEqual(20);
            charArea.Margin.Left.ShouldEqual(20);

            builder.Margin(0, 1, 2, 3);
            charArea.Margin.Top.ShouldEqual(0);
            charArea.Margin.Right.ShouldEqual(1);
            charArea.Margin.Bottom.ShouldEqual(2);
            charArea.Margin.Left.ShouldEqual(3);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            charArea.Border.Color.ShouldEqual("red");
            charArea.Border.Width.ShouldEqual(1);
            charArea.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }
    }
}