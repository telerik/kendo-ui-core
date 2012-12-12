namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartLegendBuilderTests
    {
        private readonly ChartLegendBuilder builder;
        private readonly ChartLegend legend;

        public ChartLegendBuilderTests()
        {
            legend = new ChartLegend();
            builder = new ChartLegendBuilder(legend);
        }

        [Fact]
        public void Font_sets_Font()
        {
            builder.Font("Font");
            legend.Font.ShouldEqual("Font");
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Background");
            legend.Background.ShouldEqual("Background");
        }

        [Fact]
        public void Position_sets_Position()
        {
            builder.Position(ChartLegendPosition.Bottom);
            legend.Position.ShouldEqual(ChartLegendPosition.Bottom);
        }

        [Fact]
        public void Offset_sets_offsetX()
        {
            builder.Offset(100, 0);
            legend.OffsetX.ShouldEqual(100);
        }

        [Fact]
        public void Offset_sets_offsetY()
        {
            builder.Offset(0, 100);
            legend.OffsetY.ShouldEqual(100);
        }

        [Fact]
        public void Visible_sets_Visible()
        {
            builder.Visible(false);
            legend.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            legend.Margin.Top.ShouldEqual(20);
            legend.Margin.Right.ShouldEqual(20);
            legend.Margin.Bottom.ShouldEqual(20);
            legend.Margin.Left.ShouldEqual(20);

            builder.Margin(1, 2, 3, 4);
            legend.Margin.Top.ShouldEqual(1);
            legend.Margin.Right.ShouldEqual(2);
            legend.Margin.Bottom.ShouldEqual(3);
            legend.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Padding_sets_paddings()
        {
            builder.Padding(20);
            legend.Padding.Top.ShouldEqual(20);
            legend.Padding.Right.ShouldEqual(20);
            legend.Padding.Bottom.ShouldEqual(20);
            legend.Padding.Left.ShouldEqual(20);

            builder.Padding(1, 2, 3, 4);
            legend.Padding.Top.ShouldEqual(1);
            legend.Padding.Right.ShouldEqual(2);
            legend.Padding.Bottom.ShouldEqual(3);
            legend.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            legend.Border.Color.ShouldEqual("red");
            legend.Border.Width.ShouldEqual(1);
            legend.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            legend.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}