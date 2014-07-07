namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ToolBarItemButton : JsonObject
    {
        public ToolBarItemButton()
        {
            //>> Initialization
        
        //<< Initialization

            Click = new ClientHandlerDescriptor();

            Toggle = new ClientHandlerDescriptor();
        }

        //>> Fields
        
        public bool? Enable { get; set; }
        
        public string Group { get; set; }
        
        public string Icon { get; set; }
        
        public string Id { get; set; }
        
        public string ImageUrl { get; set; }
        
        public bool? Selected { get; set; }
        
        public string SpriteCssClass { get; set; }   
        
        public bool? Togglable { get; set; }
        
        public string Text { get; set; }
        
        public string Url { get; set; }
        
        public ShowIn? ShowText { get; set; }
        
        public ShowIn? ShowIcon { get; set; }
        
        //<< Fields

        public ClientHandlerDescriptor Click { get; set; }

        public ClientHandlerDescriptor Toggle { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Click.HasValue())
            {
                json["click"] = Click;
            }
            
            if (Enable.HasValue)
            {
                json["enable"] = Enable;
            }
                
            if (Group.HasValue())
            {
                json["group"] = Group;
            }
            
            if (Icon.HasValue())
            {
                json["icon"] = Icon;
            }
            
            if (Id.HasValue())
            {
                json["id"] = Id;
            }
            
            if (ImageUrl.HasValue())
            {
                json["imageUrl"] = ImageUrl;
            }
            
            if (Selected.HasValue)
            {
                json["selected"] = Selected;
            }
                
            if (SpriteCssClass.HasValue())
            {
                json["spriteCssClass"] = SpriteCssClass;
            }
            
            if (Toggle.HasValue())
            {
                json["toggle"] = Toggle;
            }
            
            if (Togglable.HasValue)
            {
                json["togglable"] = Togglable;
            }
                
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (Url.HasValue())
            {
                json["url"] = Url;
            }
            
            if (ShowText.HasValue)
            {
                json["showText"] = ShowText;
            }
                
            if (ShowIcon.HasValue)
            {
                json["showIcon"] = ShowIcon;
            }
                
        //<< Serialization
        }
    }
}
