namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class ContextMenu : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public ContextMenu(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Animation = new ContextMenuAnimationSettings();
                
            Items = new List<ContextMenuItem>();
                
        //<< Initialization
        }

//>> Fields
        
        public bool? AlignToAnchor { get; set; }
        
        public ContextMenuAnimationSettings Animation
        {
            get;
            set;
        }
        
        public bool? CloseOnClick { get; set; }
        
        public object? DataSource { get; set; }
        
        public string Direction { get; set; }
        
        public string Filter { get; set; }
        
        public double? HoverDelay { get; set; }
        
        public string Orientation { get; set; }
        
        public string PopupCollision { get; set; }
        
        public string ShowOn { get; set; }
        
        public string Target { get; set; }
        
        public List<ContextMenuItem> Items
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (AlignToAnchor.HasValue)
            {
                json["alignToAnchor"] = AlignToAnchor;
            }
                
            var animation = Animation.ToJson();
            if (animation.Any())
            {
                json["animation"] = animation;
            }
                
            if (CloseOnClick.HasValue)
            {
                json["closeOnClick"] = CloseOnClick;
            }
                
            if (DataSource.HasValue)
            {
                json["dataSource"] = DataSource;
            }
                
            if (Direction.HasValue())
            {
                json["direction"] = Direction;
            }
            
            if (Filter.HasValue())
            {
                json["filter"] = Filter;
            }
            
            if (HoverDelay.HasValue)
            {
                json["hoverDelay"] = HoverDelay;
            }
                
            if (Orientation.HasValue())
            {
                json["orientation"] = Orientation;
            }
            
            if (PopupCollision.HasValue())
            {
                json["popupCollision"] = PopupCollision;
            }
            
            if (ShowOn.HasValue())
            {
                json["showOn"] = ShowOn;
            }
            
            if (Target.HasValue())
            {
                json["target"] = Target;
            }
            
            var items = Items.ToJson();
            if (items.Any())
            {
                json["items"] = items;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "ContextMenu", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new ContextMenuHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

