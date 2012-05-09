namespace Kendo.Mvc.UI.Tests.Chart
{
    using Moq;
    using Kendo.Mvc.UI;

    public static class ChartTestHelper
    {
        public static Chart<T> CreateChart<T>() where T : class
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateChart<T>(urlGeneratorMock.Object);
        }

        public static Chart<T> CreateChart<T>(IUrlGenerator urlGenerator) where T : class
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new Chart<T>(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator);
        }
    }
}
