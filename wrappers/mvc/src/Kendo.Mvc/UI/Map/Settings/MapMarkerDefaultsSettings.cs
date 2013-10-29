namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkerDefaultsSettings : JsonObject
    {
        public MapMarkerDefaultsSettings()
        {
            //>> Initialization
        
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string Color { get; set; }
        
        public double? Size { get; set; }
        
        public string Shape { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            if (Size.HasValue)
            {
                json["size"] = Size;
            }
                
            if (Shape.HasValue())
            {
                json["shape"] = Shape;
            }
            
        //<< Serialization
        }
    }
}
