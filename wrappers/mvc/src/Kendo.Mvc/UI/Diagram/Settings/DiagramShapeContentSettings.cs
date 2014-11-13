namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeContentSettings : JsonObject
    {
        public DiagramShapeContentSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Text { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public string Align { get; set; }
        
        public string FontFamily { get; set; }
        
        public double? FontSize { get; set; }
        
        public string Color { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (!string.IsNullOrEmpty(TemplateId))
            {
                json["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        TemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }
                
            if (Align.HasValue())
            {
                json["align"] = Align;
            }
            
            if (FontFamily.HasValue())
            {
                json["fontFamily"] = FontFamily;
            }
            
            if (FontSize.HasValue)
            {
                json["fontSize"] = FontSize;
            }
                
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
        //<< Serialization
        }
    }
}
