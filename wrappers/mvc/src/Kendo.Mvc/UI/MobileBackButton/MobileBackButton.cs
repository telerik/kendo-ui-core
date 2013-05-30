namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileBackButton : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileBackButton(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public string Icon { get; set; }
        
        public string Text { get; set; }
        
        //<< Fields

        public MobileButtonAlign Align { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileBackButtonHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

