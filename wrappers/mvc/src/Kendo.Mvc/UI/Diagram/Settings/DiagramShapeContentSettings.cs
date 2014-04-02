namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeContentSettings : JsonObject
    {
        public DiagramShapeContentSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Text { get; set; }
        
        public string Align { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (Align.HasValue())
            {
                json["align"] = Align;
            }
            
        //<< Serialization
        }
    }
}
