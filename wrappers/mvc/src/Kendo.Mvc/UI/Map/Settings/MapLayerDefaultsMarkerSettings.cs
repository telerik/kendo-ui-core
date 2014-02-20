namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsMarkerSettings : JsonObject
    {
        public MapLayerDefaultsMarkerSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public double? Opacity { get; set; }
        
        public MapMarkersShape? Shape { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
            }
                
            if (Shape.HasValue)
            {
                json["shape"] = Shape;
            }
                
        //<< Serialization
        }
    }
}
