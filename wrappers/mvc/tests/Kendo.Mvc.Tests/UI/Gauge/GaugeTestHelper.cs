namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Moq;
    using Kendo.Mvc.UI;

    public static class GaugeTestHelper
    {
        public static RadialGauge<double> CreateRadialGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateRadialGauge(urlGeneratorMock.Object);
        }

        public static RadialGauge<double> CreateRadialGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new RadialGauge<double>(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator);
        }

        public static LinearGauge<double> CreateLinearGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateLinearGauge(urlGeneratorMock.Object);
        }

        public static LinearGauge<double> CreateLinearGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new LinearGauge<double>(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator);
        }
    }
}
