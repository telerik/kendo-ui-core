namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPieSeriesBuilderTests
    {
        private readonly ChartPieSeries<SalesData, decimal> series;
        private readonly ChartPieSeriesBuilder<SalesData> builder;

        public ChartPieSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartPieSeries<SalesData, decimal>(chart, s => s.RepSales, s => s.RepName, null, null);
            builder = new ChartPieSeriesBuilder<SalesData>(series);
        }

        [Fact]
        public void Name_should_set_name()
        {
            builder.Name("Series");
            series.Name.ShouldEqual("Series");
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.5);
            series.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(0.5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Padding_should_set_Padding()
        {
            builder.Padding(80);
            series.Padding.ShouldEqual(80);
        }

        [Fact]
        public void StartAngle_should_set_StartAngle()
        {
            builder.StartAngle(1);
            series.StartAngle.ShouldEqual(1);
        }

        [Fact]
        public void Labels_should_set_labels_visibility()
        {
            builder.Labels(true);
            series.Labels.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Labels_should_return_builder()
        {
            builder.Labels(labels => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            series.Border.Color.ShouldEqual("red");
            series.Border.Width.ShouldEqual(1);
            series.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Overlay_should_set_overlay()
        {
            builder.Overlay(ChartPieSeriesOverlay.None);
            series.Overlay.ShouldEqual(ChartPieSeriesOverlay.None);
        }

        [Fact]
        public void Overlay_should_return_builder()
        {
            builder.Overlay(ChartPieSeriesOverlay.None).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Connectors_should_set_connectors_color()
        {
            builder.Connectors(c => c.Color("red"));
            series.Connectors.Color.ShouldEqual("red");
        }

        [Fact]
        public void Connectors_should_return_builder()
        {
            builder.Connectors(c => { }).ShouldBeSameAs(builder);
        }
    }
}