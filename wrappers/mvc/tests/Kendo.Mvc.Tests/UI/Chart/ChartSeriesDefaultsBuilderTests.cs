namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartSeriesDefaultsBuilderTests
    {
        private readonly Chart<object> chart;
        private readonly ChartSeriesDefaultsBuilder<object> builder;

        public ChartSeriesDefaultsBuilderTests()
        {
            chart = ChartTestHelper.CreateChart<object>();
            builder = new ChartSeriesDefaultsBuilder<object>(chart);
        }

        [Fact]
        public void Bar_sets_BarSeries_options()
        {
            builder.Bar().Gap(4);
            chart.SeriesDefaults.Bar.Gap.ShouldEqual(4);
        }

        [Fact]
        public void Column_sets_ColumnSeries_options()
        {
            builder.Column().Gap(4);
            chart.SeriesDefaults.Column.Gap.ShouldEqual(4);
        }

        [Fact]
        public void Line_sets_LineSeries_options()
        {
            builder.Line().Width(4);
            chart.SeriesDefaults.Line.Width.ShouldEqual(4);
        }

        [Fact]
        public void VerticalLine_sets_VerticalLineSeries_options()
        {
            builder.VerticalLine().Width(4);
            chart.SeriesDefaults.VerticalLine.Width.ShouldEqual(4);
        }

        [Fact]
        public void Area_sets_AreaSeries_options()
        {
            builder.Area().Color("color");
            chart.SeriesDefaults.Area.Color.ShouldEqual("color");
        }

        [Fact]
        public void VerticalArea_sets_VerticalAreaSeries_options()
        {
            builder.VerticalArea().Color("color");
            chart.SeriesDefaults.VerticalArea.Color.ShouldEqual("color");
        }

        [Fact]
        public void Scatter_sets_ScatterSeries_options()
        {
            builder.Scatter().Opacity(.5);
            chart.SeriesDefaults.Scatter.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void ScatterLine_sets_ScatterLineSeries_options()
        {
            builder.ScatterLine().Opacity(.5);
            chart.SeriesDefaults.ScatterLine.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Pie_sets_PieSeries_options()
        {
            builder.Pie().StartAngle(42);
            chart.SeriesDefaults.Pie.StartAngle.ShouldEqual(42);
        }

        [Fact]
        public void Donut_sets_DonutSeries_options()
        {
            builder.Donut().StartAngle(42);
            chart.SeriesDefaults.Donut.StartAngle.ShouldEqual(42);
        }
    }
}