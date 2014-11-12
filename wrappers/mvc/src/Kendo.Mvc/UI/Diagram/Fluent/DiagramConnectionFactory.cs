namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Diagram for ASP.NET MVC
    /// </summary>
    public class DiagramConnectionFactory<TShapeModel, TConnectionModel> : IHideObjectMembers
        where TShapeModel : class
        where TConnectionModel : class
    {
        private readonly List<DiagramConnection> container;

        public DiagramConnectionFactory(List<DiagramConnection> container)
        {
            this.container = container;
        }

        public virtual DiagramConnectionBuilder<TShapeModel, TConnectionModel> Add()
        {
            var item = new DiagramConnection();

            container.Add(item);

            return new DiagramConnectionBuilder<TShapeModel, TConnectionModel>(item);
        }
    }
}

