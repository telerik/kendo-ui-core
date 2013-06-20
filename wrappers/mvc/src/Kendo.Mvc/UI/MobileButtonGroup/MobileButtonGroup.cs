namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileButtonGroup : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileButtonGroup(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            Index = -1;
//>> Initialization
        
            Items = new List<MobileButtonGroupItem>();
                
        //<< Initialization
        }

//>> Fields
        
        public int Index { get; set; }
        
        public string SelectOn { get; set; }
        
        public List<MobileButtonGroupItem> Items
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
            
            var html = new MobileButtonGroupHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
    }
}

