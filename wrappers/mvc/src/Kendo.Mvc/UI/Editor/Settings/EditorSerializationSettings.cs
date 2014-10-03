namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class EditorSerializationSettings : JsonObject
    {
        public EditorSerializationSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Entities { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Entities.HasValue)
            {
                json["entities"] = Entities;
            }
                
        //<< Serialization
        }
    }
}
