namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeEditableSettingsTool : JsonObject
    {
        public DiagramShapeEditableSettingsTool()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Name { get; set; }
        
        public double? Step { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Name.HasValue())
            {
                json["name"] = Name;
            }
            
            if (Step.HasValue)
            {
                json["step"] = Step;
            }
                
        //<< Serialization
        }
    }
}
