namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using Moq;

    using System.IO;
    using System.Web.UI;
    using System.Web.Mvc;
    using System;

    public class WindowHtmlBuilderFactoryTests
    {
        [Fact]
        public void Should_be_able_to_create_renderer()
        {
            WindowHtmlBuilderFactory factory = new WindowHtmlBuilderFactory();

            IWindowHtmlBuilder renderer = factory.Create(WindowTestHelper.CreateWindow(null));

            Assert.IsType<WindowHtmlBuilder>(renderer);
        }
    }
}
