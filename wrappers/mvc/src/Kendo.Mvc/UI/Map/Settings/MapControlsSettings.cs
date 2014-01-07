namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapControlsSettings : JsonObject
    {
        public MapControlsSettings()
        {
            //>> Initialization
        
            Attribution = new MapControlsAttributionSettings();
                
            Navigator = new MapControlsNavigatorSettings();
                
            Zoom = new MapControlsZoomSettings();
                
        //<< Initialization

            
        }

        

        //>> Fields
        
        public MapControlsAttributionSettings Attribution
        {
            get;
            set;
        }
        
        public MapControlsNavigatorSettings Navigator
        {
            get;
            set;
        }
        
        public MapControlsZoomSettings Zoom
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization

            if (Attribution != null)
            {
                var attribution = Attribution.ToJson();
                if (attribution.Any())
                {
                    json["attribution"] = attribution;
                }
            }
            else
            {
                json["attribution"] = false;
            }
                
            var navigator = Navigator.ToJson();
            if (navigator.Any())
            {
                json["navigator"] = navigator;
            }
                
            var zoom = Zoom.ToJson();
            if (zoom.Any())
            {
                json["zoom"] = zoom;
            }
                
        //<< Serialization
        }
    }
}
