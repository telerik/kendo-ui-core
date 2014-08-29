namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ColorPickerMessagesSettings : JsonObject
    {
        public ColorPickerMessagesSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Apply { get; set; }
        
        public string Cancel { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Apply.HasValue())
            {
                json["apply"] = Apply;
            }
            
            if (Cancel.HasValue())
            {
                json["cancel"] = Cancel;
            }
            
        //<< Serialization
        }
    }
}
