namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

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
            return new RadialGauge(viewContext, new JavaScriptInitializer(), urlGenerator);
        }

        public static LinearGauge CreateLinearGauge()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateLinearGauge(urlGeneratorMock.Object);
        }

        public static LinearGauge CreateLinearGauge(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new LinearGauge(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
