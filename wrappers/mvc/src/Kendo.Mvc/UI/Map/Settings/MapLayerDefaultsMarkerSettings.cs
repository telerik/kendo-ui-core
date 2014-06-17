namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsMarkerSettings : JsonObject
    {
        public MapLayerDefaultsMarkerSettings(Map map)
        {
            //>> Initialization
        
        //<< Initialization

            Tooltip = new MapMarkerTooltip(map.ViewContext, map.Initializer, map.ViewData);
        }

        //>> Fields
        
        public double? Opacity { get; set; }
        
        public MapMarkersShape? Shape { get; set; }
        
        //<< Fields

        public MapMarkerTooltip Tooltip { get; set; }

        public string ShapeName { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
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
