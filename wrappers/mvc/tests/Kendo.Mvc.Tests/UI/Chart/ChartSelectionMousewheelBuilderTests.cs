namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartSelectionMousewheelBuilderTests
    {
        private readonly ChartSelectionMousewheelBuilder builder;
        private readonly ChartSelectionMousewheel mousewheel;

        public ChartSelectionMousewheelBuilderTests()
        {
            mousewheel = new ChartSelectionMousewheel();
            builder = new ChartSelectionMousewheelBuilder(mousewheel);
        }

        [Fact]
        public void Reverse_sets_reverse_to_true()
        {
            builder.Reverse();
            mousewheel.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Reverse_should_return_builder()
        {
            builder.Reverse().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Reverse_with_value_sets_reverse()
        {
            builder.Reverse(true);
            mousewheel.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Reverse_with_value_should_return_builder()
        {
            builder.Reverse(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Zoom_should_set_zoom()
        {
            builder.Zoom(ChartZoomDirection.Left);
            mousewheel.Zoom.ShouldEqual(ChartZoomDirection.Left);
        }

        [Fact]
        public void Zoom_should_return_builder()
        {
            builder.Zoom(ChartZoomDirection.Left).ShouldBeSameAs(builder);
        }
    }
}