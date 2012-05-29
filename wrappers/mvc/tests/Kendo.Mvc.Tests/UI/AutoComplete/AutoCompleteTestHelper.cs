namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using System.IO;
    using System.Web.UI;
    using System.Web;
    using System.Collections.Generic;

    public static class AutoCompleteTestHelper
    {
        public static Mock<INavigationItemAuthorization> authorization;
        public static UrlGenerator urlGenerator;

        public static ViewContext viewContext;
        public static ViewDataDictionary viewDataDinctionary;
        public static Mock<IValueProvider> valueProvider;

        public static AutoComplete CreateAutocomplete()
        {

            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            urlGenerator = new UrlGenerator();
            authorization = new Mock<INavigationItemAuthorization>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            var viewDataDinctionary = new ViewDataDictionary();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            valueProvider = new Mock<IValueProvider>();

            Controller controller = new ControllerTestDouble(new Dictionary<string, ValueProviderResult>(), viewDataContainer.Object.ViewData);
            controller.ValueProvider = valueProvider.Object;
            ControllerContext controllerContext = new ControllerContext(TestHelper.CreateRequestContext(), controller);

            viewContext = new ViewContext(controllerContext, new Mock<IView>().Object, new ViewDataDictionary(), new TempDataDictionary(), TextWriter.Null);

            viewContext.ViewData = viewDataDinctionary;

            authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            AutoComplete Autocomplete = new AutoComplete(viewContext, null, new ViewDataDictionary(), urlGenerator);

            return Autocomplete;
        }
    }
}
