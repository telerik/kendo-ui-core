namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Moq;
    using Kendo.Mvc.UI;

    public static class GaugeTestHelper
    {
        public static RadialGauge CreateRadialGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateRadialGauge(urlGeneratorMock.Object);
        }

        public static RadialGauge CreateRadialGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new RadialGauge(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator);
        }

        public static LinearGauge CreateLinearGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateLinearGauge(urlGeneratorMock.Object);
        }

        public static LinearGauge CreateLinearGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new LinearGauge(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator);
        }
    }
}
