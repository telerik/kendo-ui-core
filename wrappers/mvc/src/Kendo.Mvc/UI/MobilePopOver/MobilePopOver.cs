namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobilePopOver : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobilePopOver(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            Content = new HtmlTemplate();
//>> Initialization
        
            Pane = new MobilePopOverPaneSettings();
                
            Popup = new MobilePopOverPopupSettings();
                
        //<< Initialization
        }

//>> Fields
        
        public MobilePopOverPaneSettings Pane
        {
            get;
            private set;
        }
        
        public MobilePopOverPopupSettings Popup
        {
            get;
            private set;
        }
        
        //<< Fields

        public HtmlTemplate Content
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
            
            var html = new MobilePopOverHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
    }
}

