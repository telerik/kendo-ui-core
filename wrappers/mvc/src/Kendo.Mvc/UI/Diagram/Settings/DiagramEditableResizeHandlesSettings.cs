namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramEditableResizeHandlesSettings : JsonObject
    {
        public DiagramEditableResizeHandlesSettings()
        {
            //>> Initialization
        
            Hover = new DiagramEditableResizeHandlesHoverSettings();
                
            Stroke = new DiagramEditableResizeHandlesStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public string Background { get; set; }
        
        public DiagramEditableResizeHandlesStrokeSettings Stroke
        {
            get;
            set;
        }
        
        public DiagramEditableResizeHandlesHoverSettings Hover
        {
            get;
            set;
        }
        
        public double? Width { get; set; }
        
        public double? Height { get; set; }
        
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
                
            var hover = Hover.ToJson();
            if (hover.Any())
            {
                json["hover"] = hover;
            }
                
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
        //<< Serialization
        }
    }
}
