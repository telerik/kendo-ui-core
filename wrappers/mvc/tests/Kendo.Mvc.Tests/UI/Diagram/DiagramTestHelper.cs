namespace Kendo.Mvc.UI.Tests.Diagram
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Infrastructure;

    public static class DiagramTestHelper<TShapeModel, TConnectionModel> 
        where TShapeModel : class
        where TConnectionModel : class
    {
        public static Diagram<TShapeModel, TConnectionModel> CreateDiagram()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            return CreateDiagram(urlGeneratorMock.Object);
        }

        public static Diagram<TShapeModel, TConnectionModel> CreateDiagram(IUrlGenerator urlGenerator)
        {
            var viewContext = TestHelper.CreateViewContext();
            return new Diagram<TShapeModel, TConnectionModel>(viewContext, new JavaScriptInitializer(), urlGenerator);
        }
    }
}
