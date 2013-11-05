namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Map for ASP.NET MVC
    /// </summary>
    public class MapLayerFactory : IHideObjectMembers
    {
        private readonly List<MapLayer> container;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public MapLayerFactory(List<MapLayer> container, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.container = container;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        public virtual MapLayerBuilder Add()
        {
            var item = new MapLayer(viewContext, urlGenerator);

            container.Add(item);

            return new MapLayerBuilder(item);
        }
    }
}

