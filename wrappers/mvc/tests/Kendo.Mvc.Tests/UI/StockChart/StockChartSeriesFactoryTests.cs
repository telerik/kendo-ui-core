namespace Kendo.Mvc.UI.Tests.StockChart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class StockChartSeriesFactoryTests
    {
        private readonly StockChart<OHLCData> chart;
        private readonly ChartSeriesFactory<OHLCData> factory;

        public StockChartSeriesFactoryTests()
        {
            chart = StockChartTestHelper.CreateStockChart<OHLCData>();
            factory = new ChartSeriesFactory<OHLCData>(chart);
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_expressions()
        {
            var builder = factory.OHLC(s => s.Open, s => s.High, s => s.Low, s => s.Close);
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_expressions_and_category_expression()
        {
            var builder = factory.OHLC(s => s.Open, s => s.High, s => s.Low, s => s.Close, null, s => s.Date);
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_value_and_color_expressions()
        {
            var builder = factory.OHLC(s => s.Open, s => s.High, s => s.Low, s => s.Close, s => s.Color);
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_type_and_member_names()
        {
            var builder = factory.OHLC(typeof(decimal), "Open", "High", "Low", "Close");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_type_member_and_category_member_name()
        {
            var builder = factory.OHLC(typeof(decimal), "Open", "High", "Low", "Close", null, "Date");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_type_member_and_color_member_name()
        {
            var builder = factory.OHLC(typeof(decimal), "Open", "High", "Low", "Close", "Color");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_member_names()
        {
            var builder = factory.OHLC("Open", "High", "Low", "Close");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_member_and_color_member_name()
        {
            var builder = factory.OHLC("Open", "High", "Low", "Close", "Color");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void OHLC_should_create_bound_ohlc_series_from_members_and_category_member_name()
        {
            var builder = factory.OHLC("Open", "High", "Low", "Close", null, "Date");
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void OHLC_should_create_unbound_ohlc_series_from_data()
        {
            var builder = factory.OHLC(new int[] { 1 });
            builder.Series.ShouldBeType<ChartOHLCSeries<OHLCData, object, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_expressions()
        {
            var builder = factory.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_expressions_and_category_expression()
        {
            var builder = factory.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close, null, null, s => s.Date);
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_value_and_color_expressions()
        {
            var builder = factory.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close, s => s.Color, s => s.DownColor);
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_type_and_member_names()
        {
            var builder = factory.Candlestick(typeof(decimal), "Open", "High", "Low", "Close");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_type_member_and_category_member_name()
        {
            var builder = factory.Candlestick(typeof(decimal), "Open", "High", "Low", "Close", null, null, "Date");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_type_member_and_color_member_name()
        {
            var builder = factory.Candlestick(typeof(decimal), "Open", "High", "Low", "Close", "Color");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_member_names()
        {
            var builder = factory.Candlestick("Open", "High", "Low", "Close");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_member_and_color_member_name()
        {
            var builder = factory.Candlestick("Open", "High", "Low", "Close", "Color");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, string>>();
        }

        [Fact]
        public void Candlestick_should_create_bound_candlestick_series_from_members_and_category_member_name()
        {
            var builder = factory.Candlestick("Open", "High", "Low", "Close", null, null, "Date");
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, decimal, DateTime>>();
        }

        [Fact]
        public void Candlestick_should_create_unbound_candlestick_series_from_data()
        {
            var builder = factory.Candlestick(new int[] { 1 });
            builder.Series.ShouldBeType<ChartCandlestickSeries<OHLCData, object, string>>();
        }
    }
}