namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsShapeSettings : JsonObject
    {
        public MapLayerDefaultsShapeSettings()
        {
            //>> Initialization
        
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string Copyright { get; set; }
        
        public string Fill { get; set; }
        
        public string Stroke { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Copyright.HasValue())
            {
                json["copyright"] = Copyright;
            }
            
            if (Fill.HasValue())
            {
                json["fill"] = Fill;
            }
            
            if (Stroke.HasValue())
            {
                json["stroke"] = Stroke;
            }
            
        //<< Serialization
        }
    }
}
