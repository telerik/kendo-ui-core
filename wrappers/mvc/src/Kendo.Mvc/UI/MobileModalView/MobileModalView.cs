namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileModalView : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileModalView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
            Header = new HtmlTemplate();
            Content = new HtmlTemplate();
            Footer = new HtmlTemplate();
            Modal = true;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public bool Modal { get; set; }
        
        public string Height { get; set; }
        
        public string Width { get; set; }
        
        public bool Zoom { get; set; }
        
        public bool Stretch { get; set; }
        
        public bool UseNativeScrolling { get; set; }
        
        public string Title { get; set; }
        
        public string Layout { get; set; }
        
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

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileModalViewHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

