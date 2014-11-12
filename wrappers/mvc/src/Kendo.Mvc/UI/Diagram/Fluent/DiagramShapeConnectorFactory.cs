namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Shape for ASP.NET MVC
    /// </summary>
    public class DiagramShapeConnectorFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramShapeConnector> container;

        public DiagramShapeConnectorFactory(List<DiagramShapeConnector> container)
        {
            this.container = container;
        }

        public virtual DiagramShapeConnectorBuilder<TShapeModel, TConnectionModel> Add()
        {
            var item = new DiagramShapeConnector();

            container.Add(item);

            return new DiagramShapeConnectorBuilder<TShapeModel, TConnectionModel>(item);
        }
    }
}

