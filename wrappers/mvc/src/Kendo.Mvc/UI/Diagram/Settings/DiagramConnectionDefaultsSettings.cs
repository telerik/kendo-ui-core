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
        
            Hover = new DiagramConnectionDefaultsHoverSettings();
                
            Stroke = new DiagramConnectionDefaultsStrokeSettings();
                
        //<< Initialization
        }

        //>> Fields
        
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
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
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
            
        //<< Serialization
        }
    }
}
