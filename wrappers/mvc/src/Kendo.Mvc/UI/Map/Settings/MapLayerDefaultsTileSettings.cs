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
        
        public string UrlTemplate { get; set; }

        public string UrlTemplateId { get; set; }
        
        public string Attribution { get; set; }
        
        public double? Opacity { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (!string.IsNullOrEmpty(UrlTemplateId))
            {
                json["urlTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        UrlTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(UrlTemplate))
            {
                json["urlTemplate"] = UrlTemplate;
            }
                
            if (Attribution.HasValue())
            {
                json["attribution"] = Attribution;
            }
            
            if (Opacity.HasValue)
            {
                json["opacity"] = Opacity;
            }
                
        //<< Serialization
        }
    }
}
