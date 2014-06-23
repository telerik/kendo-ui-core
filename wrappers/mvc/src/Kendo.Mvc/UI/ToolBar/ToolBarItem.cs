namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ToolBarItem : JsonObject
    {
        public ToolBarItem()
        {
            //>> Initialization
        
            Buttons = new List<ToolBarItemButton>();
                
            MenuButtons = new List<ToolBarItemMenuButton>();
                
        //<< Initialization
        }

        //>> Fields
        
        public List<ToolBarItemButton> Buttons
        {
            get;
            set;
        }
        
        public string Click { get; set; }
        
        public bool? Enable { get; set; }
        
        public string Group { get; set; }
        
        public string Icon { get; set; }
        
        public string Id { get; set; }
        
        public string ImageUrl { get; set; }
        
        public List<ToolBarItemMenuButton> MenuButtons
        {
            get;
            set;
        }
        
        public string OverflowTemplate { get; set; }

        public string OverflowTemplateId { get; set; }
        
        public bool? Primary { get; set; }
        
        public bool? Selectable { get; set; }
        
        public string SpriteCssClass { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public string Text { get; set; }
        
        public bool? Togglable { get; set; }
        
        public string Toggle { get; set; }
        
        public string Url { get; set; }
        
        public CommandType? Type { get; set; }
        
        public ShowIn? ShowText { get; set; }
        
        public ShowIn? ShowIcon { get; set; }
        
        public ShowInOverflowPopup? Overflow { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var buttons = Buttons.ToJson();
            if (buttons.Any())
            {
                json["buttons"] = buttons;
            }
                
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
            
            var menuButtons = MenuButtons.ToJson();
            if (menuButtons.Any())
            {
                json["menuButtons"] = menuButtons;
            }
                
            if (!string.IsNullOrEmpty(OverflowTemplateId))
            {
                json["overflowTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        OverflowTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(OverflowTemplate))
            {
                json["overflowTemplate"] = OverflowTemplate;
            }
                
            if (Primary.HasValue)
            {
                json["primary"] = Primary;
            }
                
            if (Selectable.HasValue)
            {
                json["selectable"] = Selectable;
            }
                
            if (SpriteCssClass.HasValue())
            {
                json["spriteCssClass"] = SpriteCssClass;
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
                
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (Togglable.HasValue)
            {
                json["togglable"] = Togglable;
            }
                
            if (Toggle.HasValue())
            {
                json["toggle"] = Toggle;
            }
            
            if (Url.HasValue())
            {
                json["url"] = Url;
            }
            
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
            if (ShowText.HasValue)
            {
                json["showText"] = ShowText;
            }
                
            if (ShowIcon.HasValue)
            {
                json["showIcon"] = ShowIcon;
            }
                
            if (Overflow.HasValue)
            {
                json["overflow"] = Overflow;
            }
                
        //<< Serialization

            if (Type.HasValue)
            {
                json["type"] = Type.ToString().ToCamelCase();
            }
        }
    }
}
