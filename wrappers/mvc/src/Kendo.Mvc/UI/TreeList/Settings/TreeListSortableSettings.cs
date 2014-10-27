namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListSortableSettings : JsonObject
    {
        public TreeListSortableSettings()
        {
            Enabled = false;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public bool? AllowUnsort { get; set; }
        
        public string Mode { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (AllowUnsort.HasValue)
            {
                json["allowUnsort"] = AllowUnsort;
            }
                
            if (Mode.HasValue())
            {
                json["mode"] = Mode;
            }
            
        //<< Serialization
        }
    }
}
