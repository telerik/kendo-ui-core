namespace Kendo.Mvc.UI.Tests.Diagram
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

    public static class DiagramTestHelper
    {
        public static Diagram CreateDiagram()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateDiagram(urlGeneratorMock.Object);
        }

        public static Diagram CreateDiagram(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new Diagram(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
