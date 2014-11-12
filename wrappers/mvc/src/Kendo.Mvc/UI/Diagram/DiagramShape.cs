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
        
            Connectors = new List<DiagramShapeConnector>();
                
            Content = new DiagramShapeContentSettings();
                
            Editable = new DiagramShapeEditableSettings();
                
            Fill = new DiagramShapeFillSettings();
                
            Hover = new DiagramShapeHoverSettings();
                
            Rotation = new DiagramShapeRotationSettings();
                
            Stroke = new DiagramShapeStrokeSettings();
                
        //<< Initialization

            Visual = new ClientHandlerDescriptor();
        }

        //>> Fields
        
        public string Id { get; set; }
        
        public DiagramShapeEditableSettings Editable
        {
            get;
            set;
        }
        
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
        
        public DiagramShapeFillSettings Fill
        {
            get;
            set;
        }
        
        public DiagramShapeHoverSettings Hover
        {
            get;
            set;
        }
        
        public List<DiagramShapeConnector> Connectors
        {
            get;
            set;
        }
        
        public DiagramShapeRotationSettings Rotation
        {
            get;
            set;
        }
        
        public DiagramShapeContentSettings Content
        {
            get;
            set;
        }
        
        public string Source { get; set; }
        
        //<< Fields

        public ClientHandlerDescriptor Visual { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Id.HasValue())
            {
                json["id"] = Id;
            }
            
            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            } else if (Editable.Enabled != true) {
                json["editable"] = Editable.Enabled;
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
                
            var fill = Fill.ToJson();
            if (fill.Any())
            {
                json["fill"] = fill;
            }
            var hover = Hover.ToJson();
            if (hover.Any())
            {
                json["hover"] = hover;
            }
            var connectors = Connectors.ToJson();
            if (connectors.Any())
            {
                json["connectors"] = connectors;
            }
            var rotation = Rotation.ToJson();
            if (rotation.Any())
            {
                json["rotation"] = rotation;
            }
            var content = Content.ToJson();
            if (content.Any())
            {
                json["content"] = content;
            }
            if (Source.HasValue())
            {
                json["source"] = Source;
            }
            
        //<< Serialization

            if (Visual.HasValue())
            {
                json["visual"] = Visual;
            }
        }
    }
}
