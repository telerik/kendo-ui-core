namespace Kendo.Mvc.UI.Tests.StockChart
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

    public static class StockChartTestHelper
    {
        public static StockChart<T> CreateStockChart<T>() where T : class
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateStockChart<T>(urlGeneratorMock.Object);
        }

        public static StockChart<T> CreateStockChart<T>(IUrlGenerator urlGenerator) where T : class
        {
            var viewContext = TestHelper.CreateViewContext();
            return new StockChart<T>(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
