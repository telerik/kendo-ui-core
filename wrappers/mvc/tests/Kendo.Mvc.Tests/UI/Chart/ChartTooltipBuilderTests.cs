namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartTooltipBuilderTests
    {
        private readonly ChartTooltip tooltip;
        private readonly ChartTooltipBuilder builder;

        public ChartTooltipBuilderTests()
        {
            tooltip = new ChartTooltip();
            builder = new ChartTooltipBuilder(tooltip);
        }

        [Fact]
        public void Font_sets_Font()
        {
            builder.Font("Font");
            tooltip.Font.ShouldEqual("Font");
        }

        [Fact]
        public void Visible_sets_Visible()
        {
            builder.Visible(true);
            tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            tooltip.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Blue");
            tooltip.Background.ShouldEqual("Blue");
        }

        [Fact]
        public void Padding_sets_paddings()
        {
            builder.Padding(20);
            tooltip.Padding.Top.ShouldEqual(20);
            tooltip.Padding.Right.ShouldEqual(20);
            tooltip.Padding.Bottom.ShouldEqual(20);
            tooltip.Padding.Left.ShouldEqual(20);

            builder.Padding(1, 2, 3, 4);
            tooltip.Padding.Top.ShouldEqual(1);
            tooltip.Padding.Right.ShouldEqual(2);
            tooltip.Padding.Bottom.ShouldEqual(3);
            tooltip.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red");
            tooltip.Border.Color.ShouldEqual("red");
            tooltip.Border.Width.ShouldEqual(1);
        }

        [Fact]
        public void Format_sets_format()
        {
            builder.Format("{0:C}");
            tooltip.Format.ShouldEqual("{0:C}");
        }

        [Fact]
        public void Template_sets_template()
        {
            builder.Template("${value}");
            tooltip.Template.ShouldEqual("${value}");
        }

        [Fact]
        public void Opacity_sets_opacity()
        {
            builder.Opacity(0.5);
            tooltip.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            tooltip.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}