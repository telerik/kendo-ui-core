namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.Linq;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    public static class UploadTestHelper
    {
        public static Upload CreateUpload()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateUpload(urlGeneratorMock.Object);
        }

        public static Upload CreateUpload(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new Upload(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
