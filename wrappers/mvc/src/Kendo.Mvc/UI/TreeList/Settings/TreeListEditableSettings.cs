namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListEditableSettings : JsonObject
    {
        public TreeListEditableSettings()
        {
            Enabled = false;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Mode { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Mode.HasValue())
            {
                json["mode"] = Mode;
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
