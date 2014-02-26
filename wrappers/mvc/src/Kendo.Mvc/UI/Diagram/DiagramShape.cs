namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShape : JsonObject
    {
        public DiagramShape()
        {
            //>> Initialization
        
            Hover = new DiagramShapeHoverSettings();
                
            Rotation = new DiagramShapeRotationSettings();
                
            Stroke = new DiagramShapeStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public bool? Editable { get; set; }
        
        public bool? Rotatable { get; set; }
        
        public bool? Resizable { get; set; }
        
        public string Path { get; set; }
        
        public DiagramShapeStrokeSettings Stroke
        {
            get;
            set;
        }
        
        public string Type { get; set; }
        
        public double? X { get; set; }
        
        public double? Y { get; set; }
        
        public double? MinWidth { get; set; }
        
        public double? MinHeight { get; set; }
        
        public double? Width { get; set; }
        
        public double? Height { get; set; }
        
        public string Background { get; set; }
        
        public DiagramShapeHoverSettings Hover
        {
            get;
            set;
        }
        
        public DiagramShapeRotationSettings Rotation
        {
            get;
            set;
        }
        
        public string Content { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Editable.HasValue)
            {
                json["editable"] = Editable;
            }
                
            if (Rotatable.HasValue)
            {
                json["rotatable"] = Rotatable;
            }
                
            if (Resizable.HasValue)
            {
                json["resizable"] = Resizable;
            }
                
            if (Path.HasValue())
            {
                json["path"] = Path;
            }
            
            var stroke = Stroke.ToJson();
            if (stroke.Any())
            {
                json["stroke"] = stroke;
            }
                
            if (Type.HasValue())
            {
                json["type"] = Type;
            }
            
            if (X.HasValue)
            {
                json["x"] = X;
            }
                
            if (Y.HasValue)
            {
                json["y"] = Y;
            }
                
            if (MinWidth.HasValue)
            {
                json["minWidth"] = MinWidth;
            }
                
            if (MinHeight.HasValue)
            {
                json["minHeight"] = MinHeight;
            }
                
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            if (Background.HasValue())
            {
                json["background"] = Background;
            }
            
            var hover = Hover.ToJson();
            if (hover.Any())
            {
                json["hover"] = hover;
            }
                
            var rotation = Rotation.ToJson();
            if (rotation.Any())
            {
                json["rotation"] = rotation;
            }
                
            if (Content.HasValue())
            {
                json["content"] = Content;
            }
            
        //<< Serialization
        }
    }
}
