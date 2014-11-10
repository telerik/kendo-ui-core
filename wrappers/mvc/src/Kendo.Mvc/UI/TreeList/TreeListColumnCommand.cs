namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListColumnCommand : JsonObject
    {
        public TreeListColumnCommand()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Name { get; set; }
        
        public string Text { get; set; }
        
        public string ClassName { get; set; }
        
        public ClientHandlerDescriptor Click { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Name.HasValue())
            {
                json["name"] = Name;
            }
            
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (ClassName.HasValue())
            {
                json["className"] = ClassName;
            }
            
            if (Click.HasValue())
            {
                json["click"] = Click;
            }
            
        //<< Serialization
        }
    }
}
