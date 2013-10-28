namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapLayerDefaultsTileSettings : JsonObject
    {
        public MapLayerDefaultsTileSettings()
        {
            //>> Initialization
        
        //<< Initialization

            
        }

        

        //>> Fields
        
        public string UrlTemplateId { get; set; }
        
        public string Copyright { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (UrlTemplateId.HasValue())
            {
                json["urlTemplate"] = UrlTemplateId;
            }
            
            if (Copyright.HasValue())
            {
                json["copyright"] = Copyright;
            }
            
        //<< Serialization
        }
    }
}
