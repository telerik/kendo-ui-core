namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPaneBuilderTests
    {
        private readonly ChartPaneBuilder builder;
        private readonly ChartPane pane;

        public ChartPaneBuilderTests()
        {
            pane = new ChartPane();
            builder = new ChartPaneBuilder(pane);
        }

        [Fact]
        public void Height_sets_height()
        {
            builder.Height(40);
            pane.Height.ShouldEqual(40);
        }

        [Fact]
        public void Title_sets_title_text()
        {
            builder.Title("t");
            pane.Title.Text.ShouldEqual("t");
        }

        [Fact]
        public void Title_configures_title()
        {
            builder.Title(t => t.Color("orange"));
            pane.Title.Color.ShouldEqual("orange");
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Background");
            pane.Background.ShouldEqual("Background");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            pane.Margin.Top.ShouldEqual(20);
            pane.Margin.Right.ShouldEqual(20);
            pane.Margin.Bottom.ShouldEqual(20);
            pane.Margin.Left.ShouldEqual(20);

            builder.Margin(1, 2, 3, 4);
            pane.Margin.Top.ShouldEqual(1);
            pane.Margin.Right.ShouldEqual(2);
            pane.Margin.Bottom.ShouldEqual(3);
            pane.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Padding_sets_paddings()
        {
            builder.Padding(20);
            pane.Padding.Top.ShouldEqual(20);
            pane.Padding.Right.ShouldEqual(20);
            pane.Padding.Bottom.ShouldEqual(20);
            pane.Padding.Left.ShouldEqual(20);

            builder.Padding(1, 2, 3, 4);
            pane.Padding.Top.ShouldEqual(1);
            pane.Padding.Right.ShouldEqual(2);
            pane.Padding.Bottom.ShouldEqual(3);
            pane.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            pane.Border.Color.ShouldEqual("red");
            pane.Border.Width.ShouldEqual(1);
            pane.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            pane.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}