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
        
            Fill = new DiagramEditableResizeHandlesFillSettings();
                
            Hover = new DiagramEditableResizeHandlesHoverSettings();
                
            Stroke = new DiagramEditableResizeHandlesStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramEditableResizeHandlesFillSettings Fill
        {
            get;
            set;
        }
        
        public double? Height { get; set; }
        
        public DiagramEditableResizeHandlesHoverSettings Hover
        {
            get;
            set;
        }
        
        public DiagramEditableResizeHandlesStrokeSettings Stroke
        {
            get;
            set;
        }
        
        public double? Width { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var fill = Fill.ToJson();
            if (fill.Any())
            {
                json["fill"] = fill;
            }
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            var hover = Hover.ToJson();
            if (hover.Any())
            {
                json["hover"] = hover;
            }
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
        //<< Serialization
        }
    }
}
