namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttMessagesActionsSettings : JsonObject
    {
        public GanttMessagesActionsSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Append { get; set; }
        
        public string AddChild { get; set; }
        
        public string InsertBefore { get; set; }
        
        public string InsertAfter { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Append.HasValue())
            {
                json["append"] = Append;
            }
            
            if (AddChild.HasValue())
            {
                json["addChild"] = AddChild;
            }
            
            if (InsertBefore.HasValue())
            {
                json["insertBefore"] = InsertBefore;
            }
            
            if (InsertAfter.HasValue())
            {
                json["insertAfter"] = InsertAfter;
            }
            
        //<< Serialization
        }
    }
}
