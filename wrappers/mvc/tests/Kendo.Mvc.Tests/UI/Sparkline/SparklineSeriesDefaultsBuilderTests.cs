namespace Kendo.Mvc.UI.Tests.Sparkline
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    using Moq;
    using Kendo.Mvc.Infrastructure;

    public class SparklineSeriesDefaultsBuilderTests
    {
        private readonly Sparkline<object> sparkline;
        private readonly SparklineSeriesDefaultsBuilder<object> builder;

        public SparklineSeriesDefaultsBuilderTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var viewContext = TestHelper.CreateViewContext();
            sparkline = new Sparkline<object>(viewContext, new JavaScriptInitializer(), urlGeneratorMock.Object);
            builder = new SparklineSeriesDefaultsBuilder<object>(sparkline);
        }

        [Fact]
        public void Bar_sets_BarSeries_options()
        {
            builder.Bar().Gap(4);
            sparkline.SeriesDefaults.Bar.Gap.ShouldEqual(4);
        }

        [Fact]
        public void Column_sets_ColumnSeries_options()
        {
            builder.Column().Gap(4);
            sparkline.SeriesDefaults.Column.Gap.ShouldEqual(4);
        }

        [Fact]
        public void Line_sets_LineSeries_options()
        {
            builder.Line().Width(4);
            sparkline.SeriesDefaults.Line.Width.ShouldEqual(4);
        }

        [Fact]
        public void Area_sets_AreaSeries_options()
        {
            builder.Area().Color("color");
            sparkline.SeriesDefaults.Area.Color.ShouldEqual("color");
        }

        [Fact]
        public void Pie_sets_PieSeries_options()
        {
            builder.Pie().StartAngle(42);
            sparkline.SeriesDefaults.Pie.StartAngle.ShouldEqual(42);
        }
    }
}