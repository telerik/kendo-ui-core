namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnectionDefaultsSettings : JsonObject
    {
        public DiagramConnectionDefaultsSettings()
        {
            //>> Initialization
        
            Content = new DiagramConnectionDefaultsContentSettings();
                
            Editable = new DiagramConnectionDefaultsEditableSettings();
                
            Hover = new DiagramConnectionDefaultsHoverSettings();
                
            Selection = new DiagramConnectionDefaultsSelectionSettings();
                
            Stroke = new DiagramConnectionDefaultsStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramConnectionDefaultsContentSettings Content
        {
            get;
            set;
        }
        
        public DiagramConnectionDefaultsEditableSettings Editable
        {
            get;
            set;
        }
        
        public DiagramConnectionDefaultsStrokeSettings Stroke
        {
            get;
            set;
        }
        
        public DiagramConnectionDefaultsHoverSettings Hover
        {
            get;
            set;
        }
        
        public string StartCap { get; set; }
        
        public string EndCap { get; set; }
        
        public DiagramConnectionDefaultsSelectionSettings Selection
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var content = Content.ToJson();
            if (content.Any())
            {
                json["content"] = content;
            }
            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            } else if (Editable.Enabled != true) {
                json["editable"] = Editable.Enabled;
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
            if (StartCap.HasValue())
            {
                json["startCap"] = StartCap;
            }
            
            if (EndCap.HasValue())
            {
                json["endCap"] = EndCap;
            }
            
            var selection = Selection.ToJson();
            if (selection.Any())
            {
                json["selection"] = selection;
            }
        //<< Serialization
        }
    }
}
