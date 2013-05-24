namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class MobileActionSheetItem : JsonObject
    {
        public MobileActionSheetItem()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Action { get; set; }
        
        public string Text { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Action.HasValue())
            {
                json["action"] = Action;
            }
            
        //<< Serialization
        }
    }
}
