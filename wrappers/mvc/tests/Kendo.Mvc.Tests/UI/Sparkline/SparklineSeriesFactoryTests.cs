namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    using Moq;
    using Kendo.Mvc.Infrastructure;

    public class SparklineSeriesFactoryTests
    {
        private readonly Sparkline<SalesData> sparkline;
        private readonly SparklineSeriesFactory<SalesData> factory;

        public SparklineSeriesFactoryTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var viewContext = TestHelper.CreateViewContext();
            sparkline = new Sparkline<SalesData>(viewContext, new JavaScriptInitializer(), urlGeneratorMock.Object);
            factory = new SparklineSeriesFactory<SalesData>(sparkline);
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_expression()
        {
            var builder = factory.Bar(s => s.RepSales);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_value_and_color_expression()
        {
            var builder = factory.Bar(s => s.RepSales, s => s.Color);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_bar_series_with_horizontal_orientation()
        {
            var builder = factory.Bar(s => s.RepSales);
            ((ChartBarSeries<SalesData, decimal>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_type_and_member_name()
        {
            var builder = factory.Bar(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_type_member_and_color_member_name()
        {
            var builder = factory.Bar(typeof(decimal), "RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_member_name()
        {
            var builder = factory.Bar("RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_member_and_color_member_name()
        {
            var builder = factory.Bar("RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Bar_should_create_unbound_bar_series_from_data()
        {
            var builder = factory.Bar(new int[] { 1 });
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, object>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_expression()
        {
            var builder = factory.Column(s => s.RepSales);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_value_and_color_expression()
        {
            var builder = factory.Column(s => s.RepSales, s => s.Color);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_bar_series_with_vertical_orientation()
        {
            var builder = factory.Column(s => s.RepSales);
            ((ChartBarSeries<SalesData, decimal>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Vertical);
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_type_and_member_name()
        {
            var builder = factory.Column(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_type_member_and_color_member_name()
        {
            var builder = factory.Column(typeof(decimal), "RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_member_name()
        {
            var builder = factory.Column("RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_member_and_color_member_name()
        {
            var builder = factory.Column("RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Column_should_create_unbound_bar_series_from_data()
        {
            var builder = factory.Column(new int[] { 1 });
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, object>>();
        }

        [Fact]
        public void Line_should_create_bound_line_series_from_expression()
        {
            var builder = factory.Line(s => s.RepSales);
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Line_should_create_line_series_with_horizontal_orientation()
        {
            var builder = factory.Line(s => s.RepSales);
            ((ChartLineSeries<SalesData, decimal>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Line_should_create_bound_line_series_from_type_and_member_name()
        {
            var builder = factory.Line(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Line_should_create_bound_line_series_from_member_name()
        {
            var builder = factory.Line("RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Line_should_create_unbound_line_series_from_data()
        {
            var builder = factory.Line(new int[] { 1 });
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, object>>();
        }

        [Fact]
        public void Pie_should_create_bound_Pie_series_from_expression()
        {
            var builder = factory.Pie(s => s.RepSales, s => s.RepName);
            builder.Series.ShouldBeType<ChartPieSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Pie_should_create_bound_pie_series_from_type_and_value_member_name_and_category_member_name_and_explode_member_name()
        {
            var builder = factory.Pie(typeof(decimal), "RepSales", "RepName", "Color", "Explode", "VisibleInLegend");
            builder.Series.ShouldBeType<ChartPieSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Pie_should_create_bound_pie_series_from_value_member_name_and_category_member_name()
        {
            var builder = factory.Pie("RepSales", "RepName");
            builder.Series.ShouldBeType<ChartPieSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Pie_should_create_unbound_pie_series_from_data()
        {
            var builder = factory.Pie(new int[] { 1 });
            builder.Series.ShouldBeType<ChartPieSeries<SalesData, object>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_expression()
        {
            var builder = factory.Area(s => s.RepSales);
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Area_should_create_area_series_with_horizontal_orientation()
        {
            var builder = factory.Area(s => s.RepSales);
            ((ChartAreaSeries<SalesData, decimal>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_type_and_member_name()
        {
            var builder = factory.Area(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_member_name()
        {
            var builder = factory.Area("RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal>>();
        }

        [Fact]
        public void Area_should_create_unbound_area_series_from_data()
        {
            var builder = factory.Area(new int[] { 1 });
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, object>>();
        }
    }
}