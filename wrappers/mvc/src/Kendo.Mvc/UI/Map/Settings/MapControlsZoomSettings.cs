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
        
        public string Position { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Position.HasValue())
            {
                json["position"] = Position;
            }
            
        //<< Serialization
        }
    }
}
