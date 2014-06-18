namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttColumn : JsonObject
    {
        public GanttColumn()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Field { get; set; }
        
        public string Title { get; set; }
        
        public string Format { get; set; }
        
        public string Width { get; set; }
        
        public bool? Editable { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Field.HasValue())
            {
                json["field"] = Field;
            }
            
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
            if (Format.HasValue())
            {
                json["format"] = Format;
            }
            
            if (Width.HasValue())
            {
                json["width"] = Width;
            }
            
            if (Editable.HasValue)
            {
                json["editable"] = Editable;
            }
                
        //<< Serialization
        }
    }
}
