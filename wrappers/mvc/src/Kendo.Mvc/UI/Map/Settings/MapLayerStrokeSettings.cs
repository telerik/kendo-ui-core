namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerStrokeSettings : JsonObject
    {
        public MapLayerStrokeSettings()
        {
            //>> Initialization
        
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string Color { get; set; }
        
        public int Opacity { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            json["opacity"] = Opacity;
                
        //<< Serialization
        }
    }
}
