namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableResizeHandlesHoverStrokeSettings : JsonObject
    {
        public DiagramEditableResizeHandlesHoverStrokeSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Color { get; set; }
        
        public string DashType { get; set; }
        
        public double? Width { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            if (DashType.HasValue())
            {
                json["dashType"] = DashType;
            }
            
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
        //<< Serialization
        }
    }
}
