namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListFilterableSettings : JsonObject
    {
        public TreeListFilterableSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Extra { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Extra.HasValue)
            {
                json["extra"] = Extra;
            }
                
        //<< Serialization
        }
    }
}
