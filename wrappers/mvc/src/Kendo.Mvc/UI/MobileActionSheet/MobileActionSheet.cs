namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileActionSheet : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileActionSheet(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Items = new List<MobileActionSheetItem>();
                
            Popup = new MobileActionSheetPopupSettings();
                
        //<< Initialization
        }

//>> Fields
        
        public string Cancel { get; set; }
        
        public string Title { get; set; }
        
        public MobileActionSheetPopupSettings Popup
        {
            get;
            private set;
        }
        
        public List<MobileActionSheetItem> Items
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
            
            var html = new MobileActionSheetHtmlBuilder(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }
    }
}

