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
            //>> Initialization
        
        //<< Initialization

            Tooltip = new MapMarkerTooltip(map.ViewContext, map.Initializer, map.ViewData);
            HtmlAttributes = new RouteValueDictionary();
        }

        //>> Fields
        
        public double[] Location { get; set; }
        
        public string Title { get; set; }
        
        public MapMarkersShape? Shape { get; set; }
        
        //<< Fields

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        public MapMarkerTooltip Tooltip { get; set; }

        public string ShapeName { get; set; }


        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Location != null)
            {
                json["location"] = Location;
            }
	    
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
        //<< Serialization

            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }

            if (ShapeName.HasValue())
            {
                json["shape"] = ShapeName;
            }
            else if (Shape.HasValue)
            {
                var shapeName = Shape.ToString();
                json["shape"] = shapeName.ToLowerInvariant()[0] + shapeName.Substring(1);
            }
        }
    }
}