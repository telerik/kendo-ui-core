namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ContextMenuItem : JsonObject
    {
        public ContextMenuItem()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Text { get; set; }
        
        public string Url { get; set; }
        
        public string ImageUrl { get; set; }
        
        public string SpriteCssClass { get; set; }
        
        public bool? Enabled { get; set; }
        
        public bool? Selected { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (Url.HasValue())
            {
                json["url"] = Url;
            }
            
            if (ImageUrl.HasValue())
            {
                json["imageUrl"] = ImageUrl;
            }
            
            if (SpriteCssClass.HasValue())
            {
                json["spriteCssClass"] = SpriteCssClass;
            }
            
            if (Enabled.HasValue)
            {
                json["enabled"] = Enabled;
            }
                
            if (Selected.HasValue)
            {
                json["selected"] = Selected;
            }
                
        //<< Serialization
        }
    }
}
