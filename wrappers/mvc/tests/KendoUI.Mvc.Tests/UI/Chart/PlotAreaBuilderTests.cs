namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class PlotAreaBuilderTests
    {
        private readonly PlotAreaBuilder builder;
        private readonly PlotArea plotArea;

        public PlotAreaBuilderTests()
        {
            plotArea = new PlotArea();
            builder = new PlotAreaBuilder(plotArea);
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Red");
            plotArea.Background.ShouldEqual("Red");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            plotArea.Margin.Top.ShouldEqual(20);
            plotArea.Margin.Right.ShouldEqual(20);
            plotArea.Margin.Bottom.ShouldEqual(20);
            plotArea.Margin.Left.ShouldEqual(20);

            builder.Margin(0, 1, 2, 3);
            plotArea.Margin.Top.ShouldEqual(0);
            plotArea.Margin.Right.ShouldEqual(1);
            plotArea.Margin.Bottom.ShouldEqual(2);
            plotArea.Margin.Left.ShouldEqual(3);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            plotArea.Border.Color.ShouldEqual("red");
            plotArea.Border.Width.ShouldEqual(1);
            plotArea.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }
    }
}