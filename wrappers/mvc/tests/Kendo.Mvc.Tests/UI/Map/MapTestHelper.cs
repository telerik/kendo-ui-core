namespace Kendo.Mvc.UI.Tests.Map
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

    public static class MapTestHelper
    {
        public static Map CreateMap()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateMap(urlGeneratorMock.Object);
        }

        public static Map CreateMap(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new Map(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
