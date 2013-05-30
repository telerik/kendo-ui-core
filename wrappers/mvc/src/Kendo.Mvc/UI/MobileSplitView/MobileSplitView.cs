namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileSplitView : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileSplitView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Panes = new List<MobileSplitViewPane>();
                
        //<< Initialization
        }

//>> Fields
        
        public MobileSplitViewStyle Style { get; set; }
        
        public List<MobileSplitViewPane> Panes
        {
            get;
            private set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileSplitViewHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

