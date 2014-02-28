namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Connection for ASP.NET MVC
    /// </summary>
    public class DiagramConnectionPointFactory : IHideObjectMembers
    {
        private readonly List<DiagramConnectionPoint> container;

        public DiagramConnectionPointFactory(List<DiagramConnectionPoint> container)
        {
            this.container = container;
        }

        public virtual DiagramConnectionPointBuilder Add()
        {
            var item = new DiagramConnectionPoint();

            container.Add(item);

            return new DiagramConnectionPointBuilder(item);
        }
    }
}

