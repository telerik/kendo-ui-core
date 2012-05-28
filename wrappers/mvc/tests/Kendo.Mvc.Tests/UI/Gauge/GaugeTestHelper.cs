namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

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
            return new RadialGauge<double>(viewContext, new JavaScriptInitializer(), urlGenerator);
        }

        public static LinearGauge<double> CreateLinearGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateLinearGauge(urlGeneratorMock.Object);
        }

        public static LinearGauge<double> CreateLinearGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new LinearGauge<double>(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
