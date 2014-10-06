namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.IO;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.UI;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.Infrastructure;
    using Moq;

    public static class GanttTestHelper
    {
        public static Gantt<TTaskModel, TDependencyModel> CreateGantt<TTaskModel, TDependencyModel>(HtmlTextWriter writer)
            where TTaskModel : class, IGanttTask
            where TDependencyModel : class, IGanttDependency
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

            Gantt<TTaskModel, TDependencyModel> gantt = new Gantt<TTaskModel, TDependencyModel>(viewContext, initializer.Object, urlGenerator.Object) { Name = "gantt" };

            return gantt;
        }
    }
}
