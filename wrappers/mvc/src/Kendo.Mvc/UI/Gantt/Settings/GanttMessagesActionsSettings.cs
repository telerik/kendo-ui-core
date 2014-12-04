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
        
        public string AddChild { get; set; }
        
        public string Append { get; set; }
        
        public string InsertAfter { get; set; }
        
        public string InsertBefore { get; set; }
        
        public string Pdf { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (AddChild.HasValue())
            {
                json["addChild"] = AddChild;
            }
            
            if (Append.HasValue())
            {
                json["append"] = Append;
            }
            
            if (InsertAfter.HasValue())
            {
                json["insertAfter"] = InsertAfter;
            }
            
            if (InsertBefore.HasValue())
            {
                json["insertBefore"] = InsertBefore;
            }
            
            if (Pdf.HasValue())
            {
                json["pdf"] = Pdf;
            }
            
        //<< Serialization
        }
    }
}
