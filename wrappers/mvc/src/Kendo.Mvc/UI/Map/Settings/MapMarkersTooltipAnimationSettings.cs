namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkersTooltipAnimationSettings : JsonObject
    {
        public MapMarkersTooltipAnimationSettings()
        {
            //>> Initialization
        
            Close = new MapMarkersTooltipAnimationCloseSettings();
                
            Open = new MapMarkersTooltipAnimationOpenSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public MapMarkersTooltipAnimationCloseSettings Close
        {
            get;
            private set;
        }
        
        public MapMarkersTooltipAnimationOpenSettings Open
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
