namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileTabStrip : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileTabStrip(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Items = new List<MobileTabStripItem>();
                
        //<< Initialization
        }

//>> Fields
        
        public int SelectedIndex { get; set; }
        
        public List<MobileTabStripItem> Items
        {
            get;
            private set;
        }
        
        //<< Fields

        public IUrlGenerator UrlGenerator
        {
            get
            {
                return urlGenerator;
            }
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileTabStripHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
    }
}

