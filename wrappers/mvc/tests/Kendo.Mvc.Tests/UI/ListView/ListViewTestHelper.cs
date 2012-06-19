namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Infrastructure.Implementation;
    using Kendo.Mvc.UI.Html;
    
    public static class ListViewTestHelper
    {        
        public static ListView<T> CreateListView<T>(HtmlTextWriter writer) where T : class
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            if (writer != null)
            {
                httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(writer);
            }

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(new ViewDataDictionary());

            ViewContext viewContext = TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();

            ListView<T> listView = new ListView<T>(viewContext, initializer.Object, urlGenerator.Object) { Name = "ListView", TagName = "div" };

            return listView;
        }

        public static ListView<T> CreateListView<T>() where T : class
        {
            return CreateListView<T>(new HtmlTextWriter(TextWriter.Null));
        }
    }
}