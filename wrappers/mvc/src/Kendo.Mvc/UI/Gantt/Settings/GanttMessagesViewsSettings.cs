namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttMessagesViewsSettings : JsonObject
    {
        public GanttMessagesViewsSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Day { get; set; }
        
        public string Week { get; set; }
        
        public string Month { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Day.HasValue())
            {
                json["day"] = Day;
            }
            
            if (Week.HasValue())
            {
                json["week"] = Week;
            }
            
            if (Month.HasValue())
            {
                json["month"] = Month;
            }
            
        //<< Serialization
        }
    }
}
