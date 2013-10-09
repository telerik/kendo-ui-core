namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Infrastructure;
    using Moq;
    using System.Collections.Generic;

    public static class RecurrenceEditorTestHelper
    {
        //public static Mock<INavigationItemAuthorization> authorization;
        public static UrlGenerator urlGenerator;

        public static ViewContext viewContext;
        public static ViewDataDictionary viewDataDinctionary;
        public static Mock<IValueProvider> valueProvider;

        public static RecurrenceEditor CreateRecurrenceEditor()
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            urlGenerator = new UrlGenerator();
            //authorization = new Mock<INavigationItemAuthorization>();

            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();
            viewDataDinctionary = new ViewDataDictionary();
            viewDataContainer.SetupGet(container => container.ViewData).Returns(viewDataDinctionary);

            valueProvider = new Mock<IValueProvider>();

            Controller controller = new ControllerTestDouble(new Dictionary<string, ValueProviderResult>(), viewDataContainer.Object.ViewData);
            controller.ValueProvider = valueProvider.Object;
            ControllerContext controllerContext = new ControllerContext(TestHelper.CreateRequestContext(), controller);

            viewContext = new ViewContext(controllerContext, new Mock<IView>().Object, new ViewDataDictionary(), new TempDataDictionary(), TextWriter.Null);

            viewContext.ViewData = viewDataDinctionary;

            //authorization.Setup(a => a.IsAccessibleToUser(viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(true);

            RecurrenceEditor recurrenceEditor = new RecurrenceEditor(viewContext, null, new ViewDataDictionary());

            return recurrenceEditor;
        }
    }
}
