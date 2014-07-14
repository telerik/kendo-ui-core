namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeDefaultsEditableSettings : JsonObject
    {
        public DiagramShapeDefaultsEditableSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Connect { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Connect.HasValue)
            {
                json["connect"] = Connect;
            }
                
        //<< Serialization
        }
    }
}
