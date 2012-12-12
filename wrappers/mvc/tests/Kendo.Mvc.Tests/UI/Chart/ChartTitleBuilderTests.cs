namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartTitleBuilderTests
    {
        private readonly ChartTitleBuilder builder;
        private readonly ChartTitle title;

        public ChartTitleBuilderTests()
        {
            title = new ChartTitle();
            builder = new ChartTitleBuilder(title);
        }

        [Fact]
        public void Text_sets_Text()
        {
            builder.Text("Chart");
            title.Text.ShouldEqual("Chart");
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Background");
            title.Background.ShouldEqual("Background");
        }

        [Fact]
        public void Font_sets_Font()
        {
            builder.Font("Font");
            title.Font.ShouldEqual("Font");
        }

        [Fact]
        public void Color_sets_Color()
        {
            builder.Color("Color");
            title.Color.ShouldEqual("Color");
        }

        [Fact]
        public void Color_returns_builder()
        {
            builder.Color("Color").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Position_sets_Position()
        {
            builder.Position(ChartTitlePosition.Bottom);
            title.Position.ShouldEqual(ChartTitlePosition.Bottom);
        }

        [Fact]
        public void Align_sets_Align()
        {
            builder.Align(ChartTextAlignment.Right);
            title.Align.ShouldEqual(ChartTextAlignment.Right);
        }

        [Fact]
        public void Visible_sets_Visible()
        {
            builder.Visible(false);
            title.Visible.Value.ShouldBeFalse();
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            title.Margin.Top.ShouldEqual(20);
            title.Margin.Right.ShouldEqual(20);
            title.Margin.Bottom.ShouldEqual(20);
            title.Margin.Left.ShouldEqual(20);

            builder.Margin(1, 2, 3, 4);
            title.Margin.Top.ShouldEqual(1);
            title.Margin.Right.ShouldEqual(2);
            title.Margin.Bottom.ShouldEqual(3);
            title.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Padding_sets_paddings()
        {
            builder.Padding(20);
            title.Padding.Top.ShouldEqual(20);
            title.Padding.Right.ShouldEqual(20);
            title.Padding.Bottom.ShouldEqual(20);
            title.Padding.Left.ShouldEqual(20);

            builder.Padding(1, 2, 3, 4);
            title.Padding.Top.ShouldEqual(1);
            title.Padding.Right.ShouldEqual(2);
            title.Padding.Bottom.ShouldEqual(3);
            title.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            title.Border.Color.ShouldEqual("red");
            title.Border.Width.ShouldEqual(1);
            title.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            title.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}