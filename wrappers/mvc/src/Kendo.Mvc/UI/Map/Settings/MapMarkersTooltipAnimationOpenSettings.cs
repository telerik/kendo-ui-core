namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkersTooltipAnimationOpenSettings : JsonObject
    {
        public MapMarkersTooltipAnimationOpenSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Effects { get; set; }
        
        public double? Duration { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Effects.HasValue())
            {
                json["effects"] = Effects;
            }
            
            if (Duration.HasValue)
            {
                json["duration"] = Duration;
            }
                
        //<< Serialization
        }
    }
}
