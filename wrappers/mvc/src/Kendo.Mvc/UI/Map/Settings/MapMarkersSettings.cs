namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkersSettings : JsonObject
    {
        public MapMarkersSettings()
        {
            //>> Initialization
        
            Tooltip = new MapMarkersTooltipSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapMarkersTooltipSettings Tooltip
        {
            get;
            private set;
        }
        
        public MapMarkersShape? Shape { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }
                
            if (Shape.HasValue)
            {
                json["shape"] = Shape;
            }
                
        //<< Serialization
        }
    }
}
