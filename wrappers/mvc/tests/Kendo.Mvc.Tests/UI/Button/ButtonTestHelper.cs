namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Moq;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    public static class ButtonTestHelper
    {   
        public static Button CreateButton(ButtonHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));
                        
            var javaScriptInitializer = new Mock<IJavaScriptInitializer>();

            ViewContext viewContext = TestHelper.CreateViewContext();            

            Button button = new Button(viewContext, javaScriptInitializer.Object);

            renderer = renderer ?? new ButtonHtmlBuilder(button);

            return button;
        }
    }
}