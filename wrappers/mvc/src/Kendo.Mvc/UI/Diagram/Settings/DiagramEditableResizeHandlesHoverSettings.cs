namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableResizeHandlesHoverSettings : JsonObject
    {
        public DiagramEditableResizeHandlesHoverSettings()
        {
            //>> Initialization
        
            Stroke = new DiagramEditableResizeHandlesHoverStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public string Background { get; set; }
        
        public DiagramEditableResizeHandlesHoverStrokeSettings Stroke
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Background.HasValue())
            {
                json["background"] = Background;
            }
            
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
                
        //<< Serialization
        }
    }
}
