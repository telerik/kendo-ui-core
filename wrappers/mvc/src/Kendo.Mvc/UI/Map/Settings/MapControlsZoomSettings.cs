namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapControlsZoomSettings : JsonObject
    {
        public MapControlsZoomSettings()
        {
            //>> Initialization
        
        //<< Initialization            
        }

        //>> Fields
        
        //<< Fields
        public MapControlPosition? Position { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
        //<< Serialization
            if (Position.HasValue)
            {
                var pos = Position.ToString();
                json["position"] = pos.ToLowerInvariant()[0] + pos.Substring(1);
            }
        }
    }
}
