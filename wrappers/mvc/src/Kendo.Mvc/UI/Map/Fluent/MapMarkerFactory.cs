namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Map for ASP.NET MVC
    /// </summary>
    public class MapMarkerFactory : IHideObjectMembers
    {
        private readonly List<MapMarker> container;

        public MapMarkerFactory(List<MapMarker> container)
        {
            this.container = container;
        }

        public virtual MapMarkerBuilder Add()
        {
            var item = new MapMarker();

            container.Add(item);

            return new MapMarkerBuilder(item);
        }
    }
}

