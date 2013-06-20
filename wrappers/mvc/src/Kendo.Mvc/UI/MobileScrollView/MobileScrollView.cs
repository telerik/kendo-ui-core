namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileScrollView : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public MobileScrollView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            Items = new List<MobileScrollViewItem>();

            BounceVelocityThreshold = 1.6;

            Duration = 300;

            PageSize = 1;

            VelocityThreshold = 0.8;

//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public int Duration { get; set; }
        
        public int Page { get; set; }
        
        public string ItemTagName { get; set; }
        
        public bool FitItemPerPage { get; set; }
        
        //<< Fields

        public double BounceVelocityThreshold { get; set; }

        public double PageSize { get; set; }

        public double VelocityThreshold { get; set; }

        public List<MobileScrollViewItem> Items
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
            
            var html = new MobileScrollViewHtmlBuilder(this).Build();

            html.WriteTo(writer);

            //prevent rendering empty script tag
            //base.WriteHtml(writer);
        }
    }
}

