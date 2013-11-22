namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Map for ASP.NET MVC
    /// </summary>
    public class MapMarkerFactory : IHideObjectMembers
    {
        private Map map;
        private readonly List<MapMarker> container;

        public MapMarkerFactory(Map map)
        {
            this.map = map;
            this.container = map.Markers;
        }

        public virtual MapMarkerBuilder Add()
        {
            var item = new MapMarker(this.map);

            container.Add(item);

            return new MapMarkerBuilder(item);
        }
    }
}

