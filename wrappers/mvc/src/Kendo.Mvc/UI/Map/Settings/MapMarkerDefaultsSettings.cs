namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Linq;

    public class MapMarkerDefaultsSettings : JsonObject
    {
        public MapMarkerDefaultsSettings(Map map)
        {
            Tooltip = new Tooltip(map.ViewContext, map.Initializer, map.ViewData);
        }

        public Tooltip Tooltip { get; set; }
        public MapMarkersShape? Shape { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }

            if (Shape.HasValue)
            {
                json["shape"] = Shape;
            }
        }
    }
}
