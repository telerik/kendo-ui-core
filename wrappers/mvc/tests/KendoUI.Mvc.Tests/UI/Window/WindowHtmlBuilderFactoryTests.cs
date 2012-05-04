namespace KendoUI.Mvc.UI.Tests
{
    using Xunit;
    using System;

    public class WindowHtmlBuilderFactoryTests
    {
        [Fact]
        public void Should_create_renderer()
        {
            WindowHtmlBuilderFactory factory = new WindowHtmlBuilderFactory();

            factory.Create(WindowTestHelper.CreateWindow(null)).ShouldBeType<WindowHtmlBuilder>();
        }
    }
}
