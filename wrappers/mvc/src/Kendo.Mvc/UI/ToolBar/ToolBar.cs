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

    public class ToolBar : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public ToolBar(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Items = new List<ToolBarItem>();
                
        //<< Initialization
        }

//>> Fields
        
        public bool? Resizable { get; set; }
        
        public List<ToolBarItem> Items
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (Resizable.HasValue)
            {
                json["resizable"] = Resizable;
            }
                
            var items = Items.ToJson();
            if (items.Any())
            {
                json["items"] = items;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "ToolBar", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new ToolBarHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

