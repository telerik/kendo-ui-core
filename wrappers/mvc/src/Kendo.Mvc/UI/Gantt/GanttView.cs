namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttView : JsonObject
    {
        public GanttView()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public bool? Selected { get; set; }
        
        public GanttViewType? Type { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Selected.HasValue)
            {
                json["selected"] = Selected;
            }
                
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
        //<< Serialization
        }
    }
}
