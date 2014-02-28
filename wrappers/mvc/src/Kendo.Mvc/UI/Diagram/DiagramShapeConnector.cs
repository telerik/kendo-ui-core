namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeConnector : JsonObject
    {
        public DiagramShapeConnector()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Position { get; set; }
        
        public string Description { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Position.HasValue())
            {
                json["position"] = Position;
            }
            
            if (Description.HasValue())
            {
                json["description"] = Description;
            }
            
        //<< Serialization
        }
    }
}
