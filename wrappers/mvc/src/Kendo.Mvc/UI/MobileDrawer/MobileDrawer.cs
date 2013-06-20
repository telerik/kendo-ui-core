namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileDrawer : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileDrawer(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
            Header = new HtmlTemplate();
            Content = new HtmlTemplate();
            Footer = new HtmlTemplate();
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public string Title { get; set; }
        
        public MobileDrawerPosition Position { get; set; }
        
        //<< Fields

        public HtmlTemplate Header
        {
            get;
            private set;
        }

        public HtmlTemplate Content
        {
            get;
            private set;
        }

        public HtmlTemplate Footer
        {
            get;
            private set;
        }

        public string[] Views
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new MobileDrawerHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
        
    }
}

