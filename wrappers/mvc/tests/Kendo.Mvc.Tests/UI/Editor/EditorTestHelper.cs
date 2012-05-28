namespace Kendo.Mvc.UI.Tests
{
    using System.Web.Routing;
    using Moq;
    using System.Collections.Generic;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Infrastructure.Implementation;

    public static class EditorTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static ViewContext viewContext;

        public static Editor CreateEditor()
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));


            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(new ViewDataDictionary());


            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = new ViewDataDictionary();

            viewContext = TestHelper.CreateViewContext();
            viewContext.ViewData = new ViewDataDictionary();

            var urlGenerator = new Mock<IUrlGenerator>();
            urlGenerator.Setup(url => url.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>())).Returns(string.Empty);

            var initializer = new Mock<IJavaScriptInitializer>();
            return new Editor(viewContext, initializer.Object)
            {
                Name = "Editor"
            };
        }

        public static ILocalizationService CreateLocalizationService()
        {
            var localizationService = new Mock<ILocalizationService>();

            EmbeddedResource resource = new EmbeddedResource("EditorLocalization", null);

            localizationService.Setup(l => l.One(It.IsAny<string>())).Returns((string key) => resource.GetByKey(key));
            localizationService.Setup(l => l.All()).Returns(() => new Dictionary<string, string>());

            return localizationService.Object;
        }

        public static GridLocalization CreateLocalization()
        {
            return new GridLocalization(CreateLocalizationService(), null);
        }
    }
}
