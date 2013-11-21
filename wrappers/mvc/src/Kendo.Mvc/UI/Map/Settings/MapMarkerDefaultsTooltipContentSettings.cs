namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkerDefaultsTooltipContentSettings : JsonObject
    {
        public MapMarkerDefaultsTooltipContentSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Url { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Url.HasValue())
            {
                json["url"] = Url;
            }
            
        //<< Serialization
        }
    }
}
