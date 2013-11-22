namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarker : JsonObject
    {
        public MapMarker(Map map)
        {
            Tooltip = new Tooltip(map.ViewContext, map.Initializer, map.ViewData);
            HtmlAttributes = new RouteValueDictionary();
        }

        /// <summary>
        /// Gets the HTML attributes.
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        public double[] Location { get; set; }

        public Tooltip Tooltip { get; set; }
        
        public MapMarkersShape? Shape { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Location != null)
            {
                json["location"] = Location;
            }

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
