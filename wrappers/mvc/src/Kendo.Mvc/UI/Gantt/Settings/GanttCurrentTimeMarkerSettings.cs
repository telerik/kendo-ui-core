namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttCurrentTimeMarkerSettings : JsonObject
    {
        public GanttCurrentTimeMarkerSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public double? UpdateInterval { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (UpdateInterval.HasValue)
            {
                json["updateInterval"] = UpdateInterval;
            }
                
        //<< Serialization
        }
    }
}
