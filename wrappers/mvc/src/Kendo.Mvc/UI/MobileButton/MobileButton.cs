namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileButton : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileButton(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public string Icon { get; set; }
        
        public string Href { get; set; }
        
        public string Text { get; set; }
        
        public string Transition { get; set; }
        
        public string Target { get; set; }
        
        public string ActionSheetContext { get; set; }
        
        public MobileButtonRel Rel { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }
        
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            
            var html = new MobileButtonHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

