namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileSwitch : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileSwitch(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public bool Checked { get; set; }
        
        public string OffLabel { get; set; }
        
        public string OnLabel { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileSwitchHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

