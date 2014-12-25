namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeDefaultsSettingsConnector : JsonObject
    {
        public DiagramShapeDefaultsSettingsConnector()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Description { get; set; }
        
        public string Name { get; set; }
        
        public string Position { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Description.HasValue())
            {
                json["description"] = Description;
            }
            
            if (Name.HasValue())
            {
                json["name"] = Name;
            }
            
            if (Position.HasValue())
            {
                json["position"] = Position;
            }
            
        //<< Serialization
        }
    }
}
