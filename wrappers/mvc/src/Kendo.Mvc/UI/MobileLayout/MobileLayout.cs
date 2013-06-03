namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileLayout : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileLayout(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
            Header = new HtmlTemplate();
            Footer = new HtmlTemplate();
        //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Platform { get; set; }
        
        //<< Fields

        public HtmlTemplate Header 
        {
            get;
            private set;
        }

        public HtmlTemplate Footer
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileLayoutHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
    }
}

