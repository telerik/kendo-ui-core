namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttEditableSettings : JsonObject
    {
        public GanttEditableSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public bool? Confirmation { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Confirmation.HasValue)
            {
                json["confirmation"] = Confirmation;
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
                
        //<< Serialization
        }
    }
}
