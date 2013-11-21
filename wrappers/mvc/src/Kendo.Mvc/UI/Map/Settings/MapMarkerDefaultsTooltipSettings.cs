namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MapMarkerDefaultsTooltipSettings : JsonObject
    {
        public MapMarkerDefaultsTooltipSettings()
        {
            //>> Initialization
        
            Animation = new MapMarkerDefaultsTooltipAnimationSettings();
                
            Content = new MapMarkerDefaultsTooltipContentSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public bool? AutoHide { get; set; }
        
        public MapMarkerDefaultsTooltipAnimationSettings Animation
        {
            get;
            private set;
        }
        
        public MapMarkerDefaultsTooltipContentSettings Content
        {
            get;
            private set;
        }
        
        public string TemplateId { get; set; }
        
        public bool? Callout { get; set; }
        
        public bool? Iframe { get; set; }
        
        public double? Height { get; set; }
        
        public double? Width { get; set; }
        
        public string Position { get; set; }
        
        public double? ShowAfter { get; set; }
        
        public string ShowOn { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (AutoHide.HasValue)
            {
                json["autoHide"] = AutoHide;
            }
                
            var animation = Animation.ToJson();
            if (animation.Any())
            {
                json["animation"] = animation;
            }
                
            var content = Content.ToJson();
            if (content.Any())
            {
                json["content"] = content;
            }
                
            if (TemplateId.HasValue())
            {
                json["template"] = TemplateId;
            }
            
            if (Callout.HasValue)
            {
                json["callout"] = Callout;
            }
                
            if (Iframe.HasValue)
            {
                json["iframe"] = Iframe;
            }
                
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
            if (Position.HasValue())
            {
                json["position"] = Position;
            }
            
            if (ShowAfter.HasValue)
            {
                json["showAfter"] = ShowAfter;
            }
                
            if (ShowOn.HasValue())
            {
                json["showOn"] = ShowOn;
            }
            
        //<< Serialization
        }
    }
}
