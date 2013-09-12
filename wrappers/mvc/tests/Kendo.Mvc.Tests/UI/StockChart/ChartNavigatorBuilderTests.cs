namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Tests.StockChart;

    public class ChartNavigatorBuilderTests
    {
        private readonly ChartNavigator<OHLCData> navigator;
        private readonly ChartNavigatorBuilder<OHLCData> builder;
        private readonly StockChart<OHLCData> chart;

        public ChartNavigatorBuilderTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var viewContext = TestHelper.CreateViewContext();
            chart = StockChartTestHelper.CreateStockChart<OHLCData>();
            navigator = new ChartNavigator<OHLCData>(chart, viewContext, urlGeneratorMock.Object);
            builder = new ChartNavigatorBuilder<OHLCData>(navigator);
        }

        [Fact]
        public void AutoBind_should_set_AutoBind()
        {
            builder.AutoBind(false);
            navigator.AutoBind.ShouldEqual(false);
        }

        [Fact]
        public void AutoBind_should_return_builder()
        {
            builder.AutoBind(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DataSource_return_builder()
        {
            builder.DataSource(dataSource => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DateField_should_set_DateField()
        {
            builder.DateField("date");
            navigator.DateField.ShouldEqual("date");
        }

        [Fact]
        public void DateField_should_return_builder()
        {
            builder.DateField("date").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Hint_should_return_builder()
        {
            builder.Hint(series => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Series_should_return_builder()
        {
            builder.Series(series => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Select_should_set_select()
        {
            builder.Select(new DateTime(2012, 1, 1), new DateTime(2012, 1, 2));
            navigator.Select.From.ShouldEqual(new DateTime(2012, 1, 1));
            navigator.Select.To.ShouldEqual(new DateTime(2012, 1, 2));
        }

        [Fact]
        public void Select_should_return_builder()
        {
            builder.Select(DateTime.Now, DateTime.Now).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Visible_should_set_Visible()
        {
            builder.Visible(false);
            navigator.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Visible_should_return_builder()
        {
            builder.Visible(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void CategoryAxis_should_return_builder()
        {
            builder.CategoryAxis(axis => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void CategoryAxis_should_accept_category_expression()
        {
            builder.CategoryAxis(axis => { axis.Date().Categories(m => m.Date); });
        }

        [Fact]
        public void CategoryAxis_should_bind_categories()
        {
            chart.Data = new OHLCData[] { new OHLCData { Date = new DateTime(2000, 1, 1) } };
            builder.CategoryAxis(axis => { axis.Date().Categories(m => m.Date); });
        }

        [Fact]
        public void Pane_should_accept_category_expression()
        {
            builder.Pane(pane => { pane.Height(100); });
        }

        [Fact]
        public void Pane_should_bind_categories()
        {
            chart.Data = new OHLCData[] { new OHLCData { Date = new DateTime(2000, 1, 1) } };
            builder.Pane(pane => { pane.Height(100); });
        }
    }
}