namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerStyleStrokeSettings : JsonObject
    {
        public MapLayerStyleStrokeSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Color { get; set; }
        
        public double DashType { get; set; }
        
        public double Opacity { get; set; }
        
        public double Width { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            json["dashType"] = DashType;
                
            json["opacity"] = Opacity;
                
            json["width"] = Width;
                
        //<< Serialization
        }
    }
}
