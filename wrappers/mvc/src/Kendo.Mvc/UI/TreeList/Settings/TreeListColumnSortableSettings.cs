namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListColumnSortableSettings : JsonObject
    {
        public TreeListColumnSortableSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Compare { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Compare.HasValue())
            {
                json["compare"] = Compare;
            }
            
        //<< Serialization
        }
    }
}
