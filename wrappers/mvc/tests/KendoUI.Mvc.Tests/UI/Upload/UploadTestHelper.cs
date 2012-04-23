namespace Telerik.Web.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.Collections.Generic;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Infrastructure.Implementation;
    using Telerik.Web.Mvc.UI;

    public static class UploadTestHelper
    {
        public static Upload CreateUpload()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var localizationService = CreateLocalizationService();
            return CreateUpload(urlGeneratorMock.Object, localizationService);
        }

        public static ILocalizationService CreateLocalizationService()
        {
            var localizationService = new Mock<ILocalizationService>();

            EmbeddedResource resource = new EmbeddedResource("UploadLocalization", null);

            localizationService.Setup(l => l.One(It.IsAny<string>())).Returns((string key) => resource.GetByKey(key));
            localizationService.Setup(l => l.All()).Returns(() => new Dictionary<string, string>());

            return localizationService.Object;
        }

        public static Upload CreateUpload(IUrlGenerator urlGenerator, ILocalizationService localizationService)
        {
            var viewContext = TestHelper.CreateViewContext();
            var clientSideObjectWriterFactoryMock = new Mock<ClientSideObjectWriterFactory>();
            return new Upload(viewContext, clientSideObjectWriterFactoryMock.Object, urlGenerator, localizationService);
        }
    }
}
