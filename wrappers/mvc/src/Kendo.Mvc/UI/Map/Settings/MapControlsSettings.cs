namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapControlsSettings : JsonObject
    {
        public MapControlsSettings()
        {
            //>> Initialization
        
            Navigator = new MapControlsNavigatorSettings();
                
            Zoom = new MapControlsZoomSettings();
                
        //<< Initialization

            
        }

        

        //>> Fields
        
        public MapControlsNavigatorSettings Navigator
        {
            get;
            private set;
        }
        
        public MapControlsZoomSettings Zoom
        {
            get;
            private set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            json["navigator"] = Navigator.ToJson();
                
            json["zoom"] = Zoom.ToJson();
                
        //<< Serialization
        }
    }
}
