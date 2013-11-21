namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Linq;

    public class MapMarkerDefaultsSettings : JsonObject
    {
        public MapMarkerDefaultsSettings()
        {
            //>> Initialization
        
            Tooltip = new MapMarkerDefaultsTooltipSettings();
                
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string Shape { get; set; }
        
        public MapMarkerDefaultsTooltipSettings Tooltip
        {
            get;
            private set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Shape.HasValue())
            {
                json["shape"] = Shape;
            }
            
            var tooltip = Tooltip.ToJson();
            if (tooltip.Any())
            {
                json["tooltip"] = tooltip;
            }
                
        //<< Serialization
        }
    }
}
