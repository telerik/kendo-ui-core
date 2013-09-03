namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;
    using Moq;

    public static class SchedulerTestHelper
    {
        public static Scheduler<T> CreateScheduler<T>(HtmlTextWriter writer) where T : class, ISchedulerEvent
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

            Scheduler<T> scheduler = new Scheduler<T>(viewContext, initializer.Object, urlGenerator.Object) { Name = "scheduler" };

            return scheduler;
        }
    }
}
