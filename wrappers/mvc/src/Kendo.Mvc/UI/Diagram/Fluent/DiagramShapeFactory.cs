namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Diagram for ASP.NET MVC
    /// </summary>
    public class DiagramShapeFactory : IHideObjectMembers
    {
        private readonly List<DiagramShape> container;

        public DiagramShapeFactory(List<DiagramShape> container)
        {
            this.container = container;
        }

        public virtual DiagramShapeBuilder Add()
        {
            var item = new DiagramShape();

            container.Add(item);

            return new DiagramShapeBuilder(item);
        }
    }
}

