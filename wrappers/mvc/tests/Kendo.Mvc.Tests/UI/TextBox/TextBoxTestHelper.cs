namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;
    using Moq;
    using System.Web.Mvc;

    public static class TextBoxTestHelper<T>
    {
        public static TextBox<T> CreateTextBox()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateTextBox(urlGeneratorMock.Object);
        }

        public static TextBox<T> CreateTextBox(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new TextBox<T>(viewContext, new JavaScriptInitializer(), new ViewDataDictionary());
        }
    }
}
