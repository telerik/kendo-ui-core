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

        public MapLayerFactory(List<MapLayer> container)
        {
            this.container = container;
        }

        public virtual MapLayerBuilder Add()
        {
            var item = new MapLayer();

            container.Add(item);

            return new MapLayerBuilder(item);
        }
    }
}

