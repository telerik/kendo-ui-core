namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkerDefaultsTooltipAnimationSettings : JsonObject
    {
        public MapMarkerDefaultsTooltipAnimationSettings()
        {
            //>> Initialization
        
            Close = new MapMarkerDefaultsTooltipAnimationCloseSettings();
                
            Open = new MapMarkerDefaultsTooltipAnimationOpenSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapMarkerDefaultsTooltipAnimationCloseSettings Close
        {
            get;
            private set;
        }
        
        public MapMarkerDefaultsTooltipAnimationOpenSettings Open
        {
            get;
            private set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var close = Close.ToJson();
            if (close.Any())
            {
                json["close"] = close;
            }
                
            var open = Open.ToJson();
            if (open.Any())
            {
                json["open"] = open;
            }
                
        //<< Serialization
        }
    }
}
