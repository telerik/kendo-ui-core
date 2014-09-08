namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttEditableSettings : JsonObject
    {
        public GanttEditableSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Confirmation { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Confirmation.HasValue)
            {
                json["confirmation"] = Confirmation;
            }
                
        //<< Serialization
        }
    }
}
