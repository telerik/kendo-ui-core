namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public ChartSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart);
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_expression()
        {
            var builder = factory.Bar(s => s.RepSales, null);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.Bar(s => s.RepSales, null, s => s.Date);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_value_and_color_expression()
        {
            var builder = factory.Bar(s => s.RepSales, s => s.Color);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bar_series_with_horizontal_orientation()
        {
            var builder = factory.Bar(s => s.RepSales, null);
            ((ChartBarSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_type_and_member_name()
        {
            var builder = factory.Bar(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_type_member_and_category_member_name()
        {
            var builder = factory.Bar(typeof(decimal), "RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_type_member_and_color_member_name()
        {
            var builder = factory.Bar(typeof(decimal), "RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_member_name()
        {
            var builder = factory.Bar("RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_member_and_color_member_name()
        {
            var builder = factory.Bar("RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Bar_should_create_bound_bar_series_from_member_and_category_member_name()
        {
            var builder = factory.Bar("RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
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
            var builder = factory.Column(s => s.RepSales, null);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Column_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.Column(s => s.RepSales, null, s => s.Date);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_value_and_color_expression()
        {
            var builder = factory.Column(s => s.RepSales, s => s.Color);
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Column_should_create_bar_series_with_vertical_orientation()
        {
            var builder = factory.Column(s => s.RepSales, null);
            ((ChartBarSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Vertical);
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_type_and_member_name()
        {
            var builder = factory.Column(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_type_member_and_category_member_name()
        {
            var builder = factory.Column(typeof(decimal), "RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_type_member_and_color_member_name()
        {
            var builder = factory.Column(typeof(decimal), "RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_member_name()
        {
            var builder = factory.Column("RepSales");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_member_and_category_member_name()
        {
            var builder = factory.Column("RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Column_should_create_bound_bar_series_from_member_and_color_member_name()
        {
            var builder = factory.Column("RepSales", "Color");
            builder.Series.ShouldBeType<ChartBarSeries<SalesData, decimal, string>>();
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
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Line_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.Line(s => s.RepSales, s => s.Date, null);
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Line_should_create_line_series_with_horizontal_orientation()
        {
            var builder = factory.Line(s => s.RepSales);
            ((ChartLineSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Line_should_create_bound_line_series_from_type_and_member_name()
        {
            var builder = factory.Line(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Line_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.Line(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Line_should_create_bound_line_series_from_member_name()
        {
            var builder = factory.Line("RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Line_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.Line("RepSales", "Date");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Line_should_create_unbound_line_series_from_data()
        {
            var builder = factory.Line(new int[] { 1 });
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, object>>();
        }

        [Fact]
        public void VerticalLine_should_create_bound_line_series_from_expression()
        {
            var builder = factory.VerticalLine(s => s.RepSales);
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalLine_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.VerticalLine(s => s.RepSales, s => s.Date, null);
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalLine_should_create_line_series_with_vertical_orientation()
        {
            var builder = factory.VerticalLine(s => s.RepSales);
            ((ChartLineSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Vertical);
        }

        [Fact]
        public void VerticalLine_should_create_bound_line_series_from_type_and_member_name()
        {
            var builder = factory.VerticalLine(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalLine_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.VerticalLine(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalLine_should_create_bound_line_series_from_member_name()
        {
            var builder = factory.VerticalLine("RepSales");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalLine_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.VerticalLine("RepSales", "Date");
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalLine_should_create_unbound_line_series_from_data()
        {
            var builder = factory.VerticalLine(new int[] { 1 });
            builder.Series.ShouldBeType<ChartLineSeries<SalesData, object>>();
        }

        [Fact]
        public void Scatter_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.Scatter(s => s.RepSales, s => s.TotalSales);
            builder.Series.ShouldBeType<ChartScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void Scatter_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.Scatter(typeof(decimal), "RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void Scatter_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.Scatter("RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void Scatter_should_create_unbound_scatter_series_from_data()
        {
            var builder = factory.Scatter(new int[] { 1 });
            builder.Series.ShouldBeType<ChartScatterSeries<SalesData, object, object>>();
        }

        [Fact]
        public void ScatterLine_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.ScatterLine(s => s.RepSales, s => s.TotalSales);
            builder.Series.ShouldBeType<ChartScatterLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void ScatterLine_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.ScatterLine(typeof(decimal), "RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartScatterLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void ScatterLine_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.ScatterLine("RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartScatterLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void ScatterLine_should_create_unbound_scatter_series_from_data()
        {
            var builder = factory.ScatterLine(new int[] { 1 });
            builder.Series.ShouldBeType<ChartScatterLineSeries<SalesData, object, object>>();
        }

        [Fact]
        public void Bubble_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.Bubble(s => s.RepSales, s => s.TotalSales, s => s.RepSales);
            builder.Series.ShouldBeType<ChartBubbleSeries<SalesData, decimal, decimal, decimal>>();
        }

        [Fact]
        public void Bubble_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.Bubble(typeof(decimal), "RepSales", "TotalSales", "RepSales");
            builder.Series.ShouldBeType<ChartBubbleSeries<SalesData, decimal, decimal, decimal>>();
        }

        [Fact]
        public void Bubble_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.Bubble("RepSales", "TotalSales", "RepSales");
            builder.Series.ShouldBeType<ChartBubbleSeries<SalesData, decimal, decimal, decimal>>();
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
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.Area(s => s.RepSales, s => s.Date, null);
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Area_should_create_area_series_with_horizontal_orientation()
        {
            var builder = factory.Area(s => s.RepSales);
            ((ChartAreaSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_type_and_member_name()
        {
            var builder = factory.Area(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.Area(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_member_name()
        {
            var builder = factory.Area("RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void Area_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.Area("RepSales", "Date");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void Area_should_create_unbound_area_series_from_data()
        {
            var builder = factory.Area(new int[] { 1 });
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, object>>();
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_expression()
        {
            var builder = factory.VerticalArea(s => s.RepSales);
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.VerticalArea(s => s.RepSales, s => s.Date, null);
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalArea_should_create_area_series_with_vertical_orientation()
        {
            var builder = factory.VerticalArea(s => s.RepSales);
            ((ChartAreaSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Vertical);
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_type_and_member_name()
        {
            var builder = factory.VerticalArea(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.VerticalArea(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_member_name()
        {
            var builder = factory.VerticalArea("RepSales");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void VerticalArea_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.VerticalArea("RepSales", "Date");
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void VerticalArea_should_create_unbound_area_series_from_data()
        {
            var builder = factory.VerticalArea(new int[] { 1 });
            builder.Series.ShouldBeType<ChartAreaSeries<SalesData, object>>();
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_expression()
        {
            var builder = factory.RadarArea(s => s.RepSales);
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.RadarArea(s => s.RepSales, s => s.Date);
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarArea_should_create_area_series_with_horizontal_orientation()
        {
            var builder = factory.RadarArea(s => s.RepSales);
            ((ChartRadarAreaSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_type_and_member_name()
        {
            var builder = factory.RadarArea(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.RadarArea(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_member_name()
        {
            var builder = factory.RadarArea("RepSales");
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarArea_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.RadarArea("RepSales", "Date");
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarArea_should_create_unbound_area_series_from_data()
        {
            var builder = factory.RadarArea(new int[] { 1 });
            builder.Series.ShouldBeType<ChartRadarAreaSeries<SalesData, object>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_expression()
        {
            var builder = factory.RadarColumn(s => s.RepSales, null);
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.RadarColumn(s => s.RepSales, null, s => s.Date);
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_value_and_color_expression()
        {
            var builder = factory.RadarColumn(s => s.RepSales, s => s.Color);
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bar_series_with_horizontal_orientation()
        {
            var builder = factory.RadarColumn(s => s.RepSales, null);
            ((ChartRadarColumnSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_type_and_member_name()
        {
            var builder = factory.RadarColumn(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_type_member_and_category_member_name()
        {
            var builder = factory.RadarColumn(typeof(decimal), "RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_type_member_and_color_member_name()
        {
            var builder = factory.RadarColumn(typeof(decimal), "RepSales", "Color");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_member_name()
        {
            var builder = factory.RadarColumn("RepSales");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_member_and_color_member_name()
        {
            var builder = factory.RadarColumn("RepSales", "Color");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarColumn_should_create_bound_bar_series_from_member_and_category_member_name()
        {
            var builder = factory.RadarColumn("RepSales", null, "Date");
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarColumn_should_create_unbound_bar_series_from_data()
        {
            var builder = factory.RadarColumn(new int[] { 1 });
            builder.Series.ShouldBeType<ChartRadarColumnSeries<SalesData, object>>();
        }

        [Fact]
        public void RadarLine_should_create_bound_line_series_from_expression()
        {
            var builder = factory.RadarLine(s => s.RepSales);
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarLine_should_create_bound_area_series_from_expression_and_category_expression()
        {
            var builder = factory.RadarLine(s => s.RepSales, s => s.Date, null);
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarLine_should_create_line_series_with_horizontal_orientation()
        {
            var builder = factory.RadarLine(s => s.RepSales);
            ((ChartRadarLineSeries<SalesData, decimal, string>)builder.Series).Orientation.ShouldEqual(ChartSeriesOrientation.Horizontal);
        }

        [Fact]
        public void RadarLine_should_create_bound_line_series_from_type_and_member_name()
        {
            var builder = factory.RadarLine(typeof(decimal), "RepSales");
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarLine_should_create_bound_area_series_from_type_member_and_category_member_name()
        {
            var builder = factory.RadarLine(typeof(decimal), "RepSales", "Date");
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarLine_should_create_bound_line_series_from_member_name()
        {
            var builder = factory.RadarLine("RepSales");
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, string>>();
        }

        [Fact]
        public void RadarLine_should_create_bound_area_series_from_member_and_category_member_name()
        {
            var builder = factory.RadarLine("RepSales", "Date");
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, decimal, DateTime>>();
        }

        [Fact]
        public void RadarLine_should_create_unbound_line_series_from_data()
        {
            var builder = factory.RadarLine(new int[] { 1 });
            builder.Series.ShouldBeType<ChartRadarLineSeries<SalesData, object>>();
        }

        [Fact]
        public void PolarArea_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.PolarArea(s => s.RepSales, s => s.TotalSales);
            builder.Series.ShouldBeType<ChartPolarAreaSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarArea_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.PolarArea(typeof(decimal), "RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarAreaSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarArea_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.PolarArea("RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarAreaSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarArea_should_create_unbound_scatter_series_from_data()
        {
            var builder = factory.PolarArea(new int[] { 1 });
            builder.Series.ShouldBeType<ChartPolarAreaSeries<SalesData, object, object>>();
        }

        [Fact]
        public void PolarLine_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.PolarLine(s => s.RepSales, s => s.TotalSales);
            builder.Series.ShouldBeType<ChartPolarLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarLine_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.PolarLine(typeof(decimal), "RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarLine_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.PolarLine("RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarLineSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarLine_should_create_unbound_scatter_series_from_data()
        {
            var builder = factory.PolarLine(new int[] { 1 });
            builder.Series.ShouldBeType<ChartPolarLineSeries<SalesData, object, object>>();
        }

        [Fact]
        public void PolarScatter_should_create_bound_scatter_series_from_expression()
        {
            var builder = factory.PolarScatter(s => s.RepSales, s => s.TotalSales);
            builder.Series.ShouldBeType<ChartPolarScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarScatter_should_create_bound_scatter_series_from_type_and_member_name()
        {
            var builder = factory.PolarScatter(typeof(decimal), "RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarScatter_should_create_bound_scatter_series_from_member_name()
        {
            var builder = factory.PolarScatter("RepSales", "TotalSales");
            builder.Series.ShouldBeType<ChartPolarScatterSeries<SalesData, decimal, decimal>>();
        }

        [Fact]
        public void PolarScatter_should_create_unbound_scatter_series_from_data()
        {
            var builder = factory.PolarScatter(new int[] { 1 });
            builder.Series.ShouldBeType<ChartPolarScatterSeries<SalesData, object, object>>();
        }
    }
}